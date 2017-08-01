module.exports = {
    "env": {
        "browser": true
    },
    "globals": {
        "THREE": true
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
            "unix"
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