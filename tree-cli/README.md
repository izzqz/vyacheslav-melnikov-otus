# NodeJS tree cli reimplementation

List contents of directories in tree-like format.

### Example
*cmd/shell*
```shell
tree-vm
```
#### Output:
```
C:\Users\ZZQ\Projects\vyacheslav-melnikov-otus\tree-cli
├── .gitignore
├── bin\
│   └── tree-vm
├── node_modules\
│   └── mri\
│       ├── lib\
│       │   ├── index.js
│       │   └── index.mjs
│       ├── license.md
│       ├── package.json
│       └── readme.md
├── package-lock.json
├── package.json
├── README.md
└── src\
    ├── constants.js
    ├── index.js
    ├── lib\
    │   ├── counter.js
    │   └── printer.js
    └── tree.js
7 directories, 21 files
```

### Installation
*cmd/shell*
```text
git clone https://github.com/mr-zzq/vyacheslav-melnikov-otus.git # Clone repository
cd vyacheslav-melnikov-otus\tree-cli
npm install # Install dependencies
npm link # Create global link
```
Now you can use `tree-vm` in terminal

### Options
| Option    | Alias | Description           | Example             |
|-----------|-------|-----------------------|---------------------|
| `--depth` | `-d`  | Specify depth of tree | `tree-vm --depth 2` |

