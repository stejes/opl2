oplApp.filter('filterOpl', function(){
    return function(input, code){
        if(!code || code == ""){
            return input;
        }
        
        var i,j;
        var returnArr = new Array();
        
        for(i=0; i<input.length;i++){
            for(j=0; j< input[i].opleidingen.length;j++){
                if(input[i].opleidingen[j].opleidinginfo.oplCode == code){
                    returnArr.push(input[i]);
                }
            }
            
        }
        return returnArr;
    };
})