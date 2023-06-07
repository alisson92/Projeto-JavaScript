class produto{
    constructor(plano,download,upload,valor){
        //propriedade - variavel
        this.plano = plano;
        this.download = download;
        this.upload = upload;
        this.valor = valor;
    }
}

function montarTabela(lista){
    let auxHtml = '';
    for(let i= 0; i < lista.length; i++){
        auxHtml += '<tr>'+
                   '<td><strong>'+ lista[i].plano + 'MB</td>'+
                   '<td><strong>'+ lista[i].download + 'Mbps</td>'+
                   '<td><strong>Até '+ lista[i].upload + 'Mbps</td>'+
                   '<td><strong>R$ '+ lista[i].valor.toFixed(2).replace('.',',') + '</strong></td>'+
                   '<td>'
                        +'<a href="#" class="btn" rel="'+i+'">'+
                        '<img src="edit.png" width="30" rel="'+i+'"/>'+
                        '</a>'+
                    '</td>'+
                    '<td>'+
                        '<a href="#" class="btn btn-excluir" rel="'+i+'">'+
                        '<img src="OIP (2).png" width="40" rel="'+i+'"/>'+
                        '</a>'+
                    '</td>'+
                   '</tr>';
    }
    return auxHtml;
}

function validar(valor){
    if(!isNaN(valor) && valor != '' ){
        return true;
    }
    else{
        return false;
    }
}

auxPosicao ='';
novoRegistro = [];

let produto1 = new produto(120, 120, 80, 79.90);
let produto2 = new produto(220, 220, 100, 64.90);
let produto3 = new produto(320, 320, 200, 99.90);
let produto4 = new produto(420, 420, 300, 109.90);
let produto5 = new produto(600, 600, 400, 149.90);

novoRegistro.push(produto1);
novoRegistro.push(produto2);
novoRegistro.push(produto3);
novoRegistro.push(produto4);
novoRegistro.push(produto5);

$(document).ready(()=>{

    $('#tabela').html(montarTabela(novoRegistro));
    $('#btnSalvar').click(() =>{

        let plano = $('#plano').val();
        let download = $('#download').val();
        let upload = $('#upload').val();
        let valor = $('#valor').val();

        if(validar(plano) && download !='' && validar(upload) && validar(valor)){
            plano = parseInt(plano);
            upload = parseInt(upload);
            valor = parseInt(valor);
            let novoProduto = new produto(plano,download,upload,valor);
            if(auxPosicao==''){
                  novoRegistro.push(novoProduto)
            }else{
                novoRegistro[auxPosicao]=novoProduto
            }
            //document.getElementById('tabela').innerHTML = montarTabela(novoRegistro);
            $('#tabela').html(montarTabela(novoRegistro))
        }else{
            alert('Informe os dados corretamente!');
        }
        $('input').val('')
    })
    $('#btnCancelar').click(()=>{
        $('input').val('')
        auxPosicao=''
    })
    $('#valor').keypress((event)=>{
        if(event.which===13){
            $('#btnSalvar').click()
        }
    })

    $('#tabela').on('click','.btn', (evento)=>{
        auxPosicao = evento.target.getAttribute('rel');
        $('#plano').val(novoRegistro[auxPosicao].plano);
        $('#download').val(novoRegistro[auxPosicao].download);
        $('#upload').val(novoRegistro[auxPosicao].upload);
        $('#valor').val(novoRegistro[auxPosicao].valor);
    })
    
    $('#tabela').on('click','.btn-excluir',(evento)=>{
        if(confirm('Tem certeza que deseja excluir?')){
            novoRegistro.splice(evento.target.getAttribute('rel'),1)
            $('#tabela').html(montarTabela(novoRegistro))
            $('input').val('')
        }else{
            $('input').val('')
        }
    })

    $('#btnJson').click(()=>{
         let produtosJson = JSON.stringify(novoRegistro)
         alert(produtosJson)
    })
    $('#btnAjax').click(()=>{
        $.ajax({
            url: 'http://date.jsontest.com/',
            method: 'GET',
            dataType: 'json'
        }).done(function(dados){
            $('#data').html(dados.date)
        })
    })
    $('table').DataTable()
});