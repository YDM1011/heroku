const dataEn = require('../controlers/dataLanguage/index').dataEn.user;
const dataUa = require('../controlers/dataLanguage/index').dataUa.user;
module.exports = function(){
    return {
        method: 'get',
        viewLink: 'user',
        path: '/user/',
        key: [
            {
                name: "language",
                varDo:  (info, req) => {
                    if (info == "en"){
                        return dataEn
                    }else if (info == "ua"){
                        return dataUa
                    }else{
                        return dataEn
                    }
                }
            },
            {
                name: "user",
                varDo: (info) => {
                    if (info){
                        return {lan: info};
                    }else {
                        return {lan: "defoult"};
                    }
                }
            }
        ],
        content: {
            title: 'User'
        }
    }
};