
import { Octokit } from '@ocokit/rest'
import GitHubService from './GitHubService'

async function runTests() {
    function test_gh_import() {
      console.log(Octokit);
      if (!(Octokit)) {
        throw "Error: Gitlab is undefined";
      }
    }
    test_gh_import();
  
    async function test_gh_getLabels(gh) {
      const gh = new GitHubService();
      let owner = 'westurner';
      let repo = 'dotfiles';
      let labels = await gh.getLabels(owner, repo);
      console.log('labels', labels);
    }
    // test_gh_getLabels(gh);
}

runTests().then((e) => { console.log(e)})