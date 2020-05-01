const YAML = require('yaml')
const fs = require('fs')
const { exec } = require("child_process");
const { promisify } = require('util')

const writeFileAsync = promisify(fs.writeFile)
const execAsync = promisify(exec)
const file = fs.readFileSync('./cloudbuild.yaml', 'utf8')
const versionFilePath = './server/version.txt'
const parsed = YAML.parse(file)

const newVersion = process.argv[2]

parsed.substitutions._VERSION = newVersion

const run = async () => {
    await writeFileAsync('./cloudbuild.yaml', YAML.stringify(parsed));
    console.log("Updated yaml");
    await writeFileAsync(versionFilePath,newVersion);
    console.log("Updated version");
    await execAsync("git add .");
    await execAsync(`git commit -m \" New deployment version ${newVersion}\"`)
    await execAsync(`git tag ${newVersion}`)
    console.log(`Created tag ${newVersion}`)
    console.log("Pushing tag")
    await execAsync(`git push -f origin ${newVersion}`)
}
run();