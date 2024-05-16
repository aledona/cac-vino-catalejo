let btnSend = document.querySelector('#btn-send');
const regex = /@.*\.[a-zA-Z]+$/;
class Usuario{

    constructor(nombre,apellido,sexo, email,contrasena,fechaNacimiento,pais){
        this.nombre=nombre;
        this.apellido=apellido;
        this.sexo=sexo;
        this.email=email;
        this.contrasena=contrasena;
        this.fechaNacimiento=fechaNacimiento;
        this.pais=pais;
    }
}


btnSend.addEventListener('click',function(){
    let nombre = document.querySelector('#nombre');    
    let apellido = document.querySelector('#apellido');    
    let email = document.querySelector('#email');    
    let contrasena = document.querySelector('#contrasena');  
    let confirmContrasena = document.querySelector('#confirmContrasena');   
    let fechaNacimiento = document.querySelector('#fechaNacimiento');  
    let pais = document.querySelector('#pais');  
    let sexoMasculino = document.querySelector('#masculino');
    let sexoFemenino = document.querySelector('#femenino');
    let terminosYCondiciones = document.querySelector('#tyc');

    let errorNombre = document.querySelector('#error-nombre');
    let errorApellido = document.querySelector('#error-apellido');
    let errorEmail = document.querySelector('#error-email');
    let errorContrasena = document.querySelector('#error-contrasena');
    let errorConfirmContrasena = document.querySelector('#error-confirmContrasena');
    let errorFechaNacimiento = document.querySelector('#error-fechaNacimiento');
    let errorPais = document.querySelector('#error-pais');
    let errorSexo = document.querySelector('#error-sexo');
    let errorTyc = document.querySelector('#error-tyc');
    

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

    if (!sexoMasculino.checked && !sexoFemenino.checked) {
        errorSexo.innerHTML = 'Debes seleccionar tu sexo';
    } else {
        errorSexo.innerHTML = '';
    }

    if (!terminosYCondiciones.checked) {
        errorTyc.innerHTML = 'Debes aceptar los Términos y Condiciones';
    } else {
        errorTyc.innerHTML = '';
    }

    if (errorTyc.innerHTML === '' && errorSexo.innerHTML === '' && errorNombre.innerHTML === '' && errorApellido.innerHTML === '' && errorEmail.innerHTML === '' && errorContrasena.innerHTML === '' && errorConfirmContrasena.innerHTML === '' && errorFechaNacimiento.innerHTML === '' && errorPais.innerHTML === '') {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        
        const sexo = sexoMasculino.checked ? 'Masculino' : 'Femenino';

        const newUsuario = new Usuario (
            nombre.value.trim(),
            nombre.value.trim(),
            sexo,
            email.value.trim(),
            contrasena.value.trim(),
            fechaNacimiento.value.trim(),
            pais.value.trim()
        );
        
        if (!Array.isArray(usuarios)) {
            usuarios = [];
        }

        usuarios.push(newUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));


        alert('¡Registro exitoso! Ya puede loguearse.');
        
        nombre.value = '';
        apellido.value = '';
        email.value = '';
        contrasena.value = '';
        confirmContrasena.value = '';
        fechaNacimiento.value = '';
        pais.value = '';
        sexoMasculino.checked = false;
        sexoFemenino.checked = false;
        terminosYCondiciones.checked = false;
    }
})

