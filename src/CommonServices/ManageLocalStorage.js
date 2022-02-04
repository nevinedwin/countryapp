const ManageLocalStorage = {
    get(key){
        if(!key){
            return;
        }
        return localStorage.getItem(key)
    }, 
    set(key, data){
        if(!key){
            return;
        }
        let tempData = data
        tempData = typeof tempData === 'string' ? data : JSON.stringify(tempData);
        return localStorage.setItem(key, tempData);
    },
    delete(key){
        if(!key){
            return;
        }
        return localStorage.removeItem(key);
    },
    clear(){
        localStorage.clear();
    }
}

export default ManageLocalStorage