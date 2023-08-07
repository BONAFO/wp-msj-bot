
//ID DEL BOT
const botID = "";

//NUMERO DEL DESTINATARIO
const phoneNumb = "";

//TOKEN DE FB
const token =
  "";

//URL FETCH
const url = `https://graph.facebook.com/v17.0/${botID}/messages`;


//ENVIANDO EL MENSAJE Y VALIDANDO LA RESPUESTA
const send = async(req) => {
    const res = await fetch(url, req);
    
    if(res.status === 200){
      return {bool : true, msj : "Sent!"};
    }else{
      const error = await res.json();
      return {bool : false, msj : error, status : res.status};
    }
};


//PREPARANDO LA ESTRUCTURA DEL MENSAJE

/*

template = {
      name : NOMBRE DE LA PLANTILLA,
    leng : IDIOMA DE LA PLANTILLA
}



*/
const build_msj = async (template, phone_number) => {
  const data = {
    messaging_product: "whatsapp",
    to: phone_number,
    type: "template",
    template: {
      name: template.name,
      language: { code: template.leng },
    },
  };

  const req = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    json: true,
  };


  const res = await send(req);
  console.log(res);
  return res;
};



document.getElementById("send").onclick = ()=>{
  build_msj({
    name : "hello_world",
    leng : "en_US"
  }, phoneNumb)
};
