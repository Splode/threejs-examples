module.exports = {
    "env": {
        "browser": true
    },
    "globals": {
        "THREE": true,
        "dat": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "no-console": [
            "error", {
                "allow": [
                    "log"
                ]
            }
        ],
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};