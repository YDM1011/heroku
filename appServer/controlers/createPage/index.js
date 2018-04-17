module.exports = class{
    constructor(a, ...abs){
        this.a = a;
    }
    create(obg, app, ...abs){
        this.method = obg.method;
        let path = this.path = obg.path;
        let viewLink = this.viewLink = obg.viewLink;
        let content = this.content = obg.content;
        let key = this.key = '';
        let keyArr = [];
        try{
            key = this.key = obg.key;
        }catch(err){}
        switch (this.method){
            case "get":
                let urlContent = '';
                key.forEach(function (item, i) {
                    urlContent +=`:${item.name}/`;
                    keyArr.push(item);
                    app.get(`${path + urlContent}`, function(req, res, next) {
                        keyArr.forEach(function (itemKey) {
                            if (req.params[itemKey.name]){
                                try{
                                    content[itemKey.name] = itemKey.varDo(req.params[itemKey.name], req);
                                }catch(err){}
                            }else{
                                content[itemKey.name] = itemKey.varDo(false, req);
                            }
                        });
                        res.render(viewLink, content);
                    });
                });
                app.get(`${path}`, function(req, res, next) {
                    res.render(viewLink, content);
                });
                break;
            default: break;
        }
    }
};