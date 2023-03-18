import alert from 'sweetalert2';


const handleUnAvailable = ()=>{

    alert.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Unavailable ficture',
      })

}


const handleWelcome = (name : any)=>{

    alert.fire({
        icon: 'success',
        text: `Bienvenido ${name}`,
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: 'OK!',
        denyButtonText: `Don't save`,
        showConfirmButton : false,
        timer: 1200,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
        } 
      })



}

export {
    handleUnAvailable,
    handleWelcome
}