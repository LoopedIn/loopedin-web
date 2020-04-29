const YAML = require('yaml')
const fs = require('fs')
const { exec } = require("child_process");

const file = fs.readFileSync('./cloudbuild.yaml', 'utf8')

const parsed = YAML.parse(file)
parsed.substitutions._VERSION = process.argv[2]
const write = async () => await fs.writeFile('./cloudbuild.yaml', YAML.stringify(parsed), () => {
    console.log("File updated");
    exec("git add .", () => {
        exec(`git commit -m \" New deployment version ${process.argv[2]}\"`, () => {
            exec(`git tag ${process.argv[2]}`, () => {
                exec(`git push -f origin ${process.argv[2]}`, () => {})
            })
        });
    });
});
write();