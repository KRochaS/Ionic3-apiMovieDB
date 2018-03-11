export function dateDDMMAAAA(date, options?) {
    if (!date) {
        return '';
    } else if(typeof date === 'string') {      
        if (date.match(/^(\d{4})-(\d{2})-(\d{2})/)) {
            let year = date.substr(0, 4);
            let month = date.substr(5, 2);
            let day = date.substr(8, 2);
             return  day + '/' + month + '/' + year;
        } 
        throw new Error('Parâmetro inválido ao formatar data.');
    } else if (typeof date === 'number') {
        date = new Date(date);
    } else if (typeof date === 'object' && date.constructor.name !== 'Date') {
        throw new Error('Parâmetro de tipo inválido ao formatar data.');
    }
    let day = date.getDate();
    let month =  date.getMonth() + 1;
    let year = date.getFullYear();
    return  (day < 10 ? '0' + day :  day) + '/' +
            (month < 10 ? '0' + month :  month) + '/' +
             year;
}   


export function moneyBRReal(num) {
    if(num === undefined || num === null) {
        return '';
    } else if (typeof num === 'string') {
        num = Number(num);
    } else if (typeof num !== 'number') {
        throw new Error('Parâmetro de tipo inválido ao formatar número: \'' + num + '\'');
    }        
    return num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2  });        
}  

export function perc (perc) {    
    let _perc = perc? moneyBRReal(perc) + '%' : '';
    return _perc;
}