let btnSend = document.querySelector('#btn-send');
const regex = /@.*\.[a-zA-Z]+$/;

btnSend.addEventListener('click',function(){
    let nombre = document.querySelector('#nombre');    
    let apellido = document.querySelector('#apellido');    
    let email = document.querySelector('#email');    
    let contrasena = document.querySelector('#contrasena');  
    let confirmContrasena = document.querySelector('#confirmContrasena');   
    let fechaNacimiento = document.querySelector('#fechaNacimiento');  
    let pais = document.querySelector('#pais');  

    let errorNombre = document.querySelector('#error-nombre');
    let errorApellido = document.querySelector('#error-apellido');
    let errorEmail = document.querySelector('#error-email');
    let errorContrasena = document.querySelector('#error-contrasena');
    let errorConfirmContrasena = document.querySelector('#error-confirmContrasena');
    let errorFechaNacimiento = document.querySelector('#error-fechaNacimiento');
    let errorPais = document.querySelector('#error-pais');
    

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

    if(contrasena.value.trim()==''){       
        errorContrasena.innerHTML = 'Debes completar el campo Contraseña';        
    }
    else{        
        errorContrasena.innerHTML = '';
    }

    if(contrasena.value.trim()!=confirmContrasena.value.trim()){       
        errorConfirmContrasena.innerHTML = 'La contraseña no coincide';        
    }
    else{        
        errorConfirmContrasena.innerHTML = '';
    }

    if(fechaNacimiento.value.trim()==''){        
        errorFechaNacimiento.innerHTML = 'Debes completar el campo fecha de nacimiento';        
    }
    else{     
        let fechaNacimientoUsuario = new Date(fechaNacimiento.value);
        let mayorEdad = new Date();
        mayorEdad.setFullYear(mayorEdad.getFullYear() - 18);
        // Comparar la fecha de nacimiento con la fecha hace 18 años
        if (fechaNacimientoUsuario > mayorEdad) {    
            document.querySelector('#error-fechaNacimiento').innerHTML = 'Debes ser mayor de 18 años para registrarte';
        } else {
            document.querySelector('#error-fechaNacimiento').innerHTML = '';
        }
    }

    if(pais.value.trim()==''){        
        errorPais.innerHTML = 'Debes completar el campo pais';        
    }
    else{        
        errorPais.innerHTML = '';
    }

    if (errorNombre.innerHTML === '' && errorApellido.innerHTML === '' && errorEmail.innerHTML === '' && errorContrasena.innerHTML === '' && errorConfirmContrasena.innerHTML === '' && errorFechaNacimiento.innerHTML === '' && errorPais.innerHTML === '') {
        let usuario = {
            email: email.value.trim(),
            contrasena: contrasena.value.trim()
        };
        let usuarioJSON = JSON.stringify(usuario);

        localStorage.setItem('usuario', usuarioJSON);
        alert('¡Registro exitoso! Usuario y contraseña guardados en localStorage.');
        
        nombre.value = '';
        apellido.value = '';
        email.value = '';
        contrasena.value = '';
        confirmContrasena.value = '';
        fechaNacimiento.value = '';
        pais.value = '';
    }
})

