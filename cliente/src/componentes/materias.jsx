export const Materias =()=>{
    const id_usuario= sessionStorage.getItem('id_usuario');
    if(!id_usuario){
        return(
            <div>
                Error al cargar las materias
            </div>
        )
    }
    return(
        <div>
            Esta es la página de materias
        </div>
    )

}