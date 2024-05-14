let btnSend = document.querySelector('#btn-send');
const regex = /@.*\.[a-zA-Z]+$/;
class Contacto{

    constructor(nombre,apellido,email,nrotelefono,mensaje){
        this.nombre=nombre;
        this.apellido=apellido;
        this.email=email;
        this.nrotelefono=nrotelefono;
        this.mensaje=mensaje;
    }
}


btnSend.addEventListener('click',function(){
    let nombre = document.querySelector('#nombre');    
    let apellido = document.querySelector('#apellido');    
    let email = document.querySelector('#email');    
    let nrotelefono = document.querySelector('#nrotelefono');  
    let mensaje = document.querySelector('#mensaje');   

    let errorNombre = document.querySelector('#error-nombre');
    let errorApellido = document.querySelector('#error-apellido');
    let errorEmail = document.querySelector('#error-email');
    let errorNrotelefono = document.querySelector('#error-nrotelefono');
    let errorMensaje = document.querySelector('#error-mensaje');
    

    if(nombre.value.trim()==''){       
        errorNombre.innerHTML = 'Debes completar el campo Nombre';
    }
    else{        
        let  errorNombre = document.querySelector('#error-nombre');
        errorNombre.innerHTML = '';
    }

    if(apellido.value.trim()==''){      
        errorApellido.innerHTML = 'Debes completar el campo Apellido';        
    }
    else{        
        errorApellido.innerHTML = '';
    }

    if (!regex.test(email.value.trim())) {  
        errorEmail.innerHTML = 'Debes ingresar un email';        
    }
    else{        
        errorEmail.innerHTML = '';
    }
    if(nrotelefono.value.trim()==''){      
        errorNrotelefono.innerHTML = 'Debes completar el campo teléfono';        
    }
    else{        
        errorNrotelefono.innerHTML = '';
    }
    if(mensaje.value.trim()==''){      
        errorMensaje.innerHTML = 'Debes completar el campo mensaje';        
    }
    else{        
        errorMensaje.innerHTML = '';
    }
    
    if (errorNombre.innerHTML === '' && errorApellido.innerHTML === '' && errorEmail.innerHTML === '' && errorNrotelefono.innerHTML === '' && errorMensaje.innerHTML === '') {
        let contactos = JSON.parse(localStorage.getItem('contactos')) || [];
    
        const newContacto = new Contacto (
            nombre.value.trim(),
            apellido.value.trim(),
            email.value.trim(),
            nrotelefono.value.trim(),
            mensaje.value.trim(),
        );
    
        if (!Array.isArray(contactos)) {
            contactos = [];
        }
    
        contactos.push(newContacto);
        localStorage.setItem('contactos', JSON.stringify(contactos));
    
        alert('El mensaje se envió exitosamente, a la brevedad nos estaremos comunicando. Gracias.');
    
        nombre.value = '';
        apellido.value = '';
        email.value = '';
        nrotelefono.value = '';
        mensaje.value = '';
    }
    
    
        
})

