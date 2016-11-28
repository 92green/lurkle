import fs from 'fs';
import yaml from 'js-yaml';

export default function loadYaml(path) {
    return yaml.load(fs.readFileSync(path));
}
