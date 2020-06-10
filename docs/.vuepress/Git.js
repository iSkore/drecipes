/** ****************************************************************************************************
 * File: Git.js
 * Project: recipes
 * @author MI-SEC
 *******************************************************************************************************/
'use strict';

// ref: https://dev.to/lucis/how-to-push-files-programatically-to-a-repository-using-octokit-with-typescript-1nj0
class Git
{
    constructor( octo )
    {
        if ( !octo ) {
            throw new Error( '[Git] instance of octokit is required' );
        }

        this.octo = octo;
    }

    async createBlobForFile( owner, repo, fileContent )
    {
        // const content = Buf.from( fileContent );
        // const content = fileContent.toString( 'utf8' );
        const content = fileContent;

        console.log( this.octo.git );
        const blobData = await this.octo.git.createBlob( {
            owner,
            repo,
            content
        } );

        console.log( 'blobData', blobData );

        return blobData.data;
    }

    async getCurrentCommit( owner, repo, branch )
    {
        console.log( '[getCurrentCommit]', owner, repo, branch );
        const { data: refData } = await this.octo.git.getRef( {
            owner,
            repo,
            ref: `heads/${ branch }`
        } );

        console.log( '[getCurrentCommit]', refData );

        const commitSha = refData.object.sha;

        const { data: commitData } = await this.octo.git.getCommit( {
            owner,
            repo,
            commit_sha: commitSha
        } );

        return {
            commitSha,
            treeSha: commitData.tree.sha
        };
    }

    async createNewTree( owner, repo, paths, blobs, parentTreeSha )
    {
        // My custom config. Could be taken as parameters
        // const tree = blobs.map( ( { sha }, index ) => ( {
        // } ) );

        console.log( '[createNewTree]', owner, repo, paths, blobs, parentTreeSha );

        const { data } = await this.octo.git.createTree( {
            owner,
            repo,
            tree: [
                {
                    path: paths,
                    mode: '100644',
                    type: 'blob',
                    sha
                }
            ],
            base_tree: parentTreeSha
        } );

        return data;
    }

    async createNewCommit( owner, repo, message, currentTreeSha, currentCommitSha )
    {
        return await this.octo.git.createCommit( {
            owner,
            repo,
            message,
            tree: currentTreeSha,
            parents: [ currentCommitSha ]
        } );
    }

    async setBranchToCommit( owner, repo, branch, commitSha )
    {
        return this.octo.git.updateRef( {
            owner,
            repo,
            ref: `heads/${ branch }`,
            sha: commitSha
        } );
    }

    async uploadToRepo( owner, repo, branch, filePath, fileContent )
    {
        console.log( 'uploadToRepo BEGIN' );
        const currentCommit = await this.getCurrentCommit( owner, repo, branch );
        console.log( 'currentCommit', currentCommit );
        console.log( 'fileContent', fileContent );
        fileContent = await this.createBlobForFile( owner, repo, fileContent );
        console.log( 'fileContent', fileContent );

        const newTree = await this.createNewTree(
            owner,
            repo,
            filePath,
            fileContent,
            currentCommit.treeSha
        );

        console.log( 'newTree', newTree );

        const commitMessage = `My commit message`;

        const newCommit = await this.createNewCommit(
            owner,
            repo,
            commitMessage,
            newTree.sha,
            currentCommit.commitSha
        );

        console.log( 'newTree', newTree );

        const updateBranch = await this.setBranchToCommit( owner, repo, branch, newCommit.sha );

        console.log( 'updateBranch', updateBranch );
    }
}

export default Git;
