
import { GitLabService } from './GitHubService'

async function runTests() {
  function test_gl_import() {
    console.log(Gitlab);
    if (!(Gitlab)) {
      throw "Error: Gitlab is undefined"
    }
  }
  test_gl_import();

  async function test_gl_getLabels(gl) {
    const gl = new GitLabService();
    let owner = 'westurner';
    let repo = 'dotfiles';
    let projectId = owner + "/" + repo;
    let labels = await gl.getLabels(projectId);
    console.log('labels', labels);

    let yamlOutput = yaml.safeDump(labels);
    console.log(yamlOutput);
  }
  test_gl_getLabels(gl);
}

runTests().then(() => { console.log(e) })