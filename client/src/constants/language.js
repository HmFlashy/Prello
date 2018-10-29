const lang = "EN"

//Get value in db

const strings = {
    "EN": {
        "string1": "",
        "string2": ""
    },
    "FR": {
        "string1": "",
        "string2": ""
    }
}

export default (string) => strings[lang][string]