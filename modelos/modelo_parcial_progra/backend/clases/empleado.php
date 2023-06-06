<?php
require_once("./clases/Usuario.php");
require_once("./clases/ICRUD.php");
class Empleado extends Usuario implements ICRUD
{
    public string $_fotos;
    public int $_sueldo;

    function __construct(string $correo, string $nombre, string $clave, int $id = -1, int $id_perfil = -1, string $foto, int $sueldo)
    {
        parent :: __construct($correo,$nombre,$clave,$id,$id_perfil);
        $this->_fotos = $foto;
        $this->_sueldo = $sueldo;
    }


    static function TraerTodos() : array
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        
        $consulta = $objetoAccesoDato->retornarConsulta("SELECT * FROM empleados");        
        
        $consulta->execute();                                               

        return $consulta->fetchAll(PDO::FETCH_OBJ) ; 
    }

    public static function TraerUnoId(string $id)
    {    
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        
        $consulta = $objetoAccesoDato->retornarConsulta("SELECT * FROM empleados WHERE id = :id");        
        $consulta->bindValue(':id', $id, PDO::PARAM_INT);
        $consulta->execute();
        
        $objeto = $consulta->fetchAll(PDO::FETCH_OBJ);                                                

        return $objeto; 
    }

    function Agregar() : bool
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        
        $consulta =$objetoAccesoDato->retornarConsulta("INSERT INTO empleados (id, correo, clave, nombre, id_perfil, foto, sueldo)"
                                                    . "VALUES(:id, :correo, :clave, :nombre, :id_perfil, :foto, :sueldo)");
        
        $consulta->bindValue(':id', $this->_id, PDO::PARAM_INT);
        $consulta->bindValue(':correo', $this->_correo, PDO::PARAM_STR);
        $consulta->bindValue(':clave', $this->_clave, PDO::PARAM_STR);
        $consulta->bindValue(':nombre', $this->_nombre, PDO::PARAM_STR);
        $consulta->bindValue(':id_perfil', $this->_id_perfil, PDO::PARAM_INT);
        $consulta->bindValue(':sueldo', $this->_sueldo, PDO::PARAM_INT);
        $consulta->bindValue(':foto', $this->_fotos, PDO::PARAM_STR);

        $consulta->execute();  
        
        return true;
    }
    function Modificar(int $id) : bool
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $retorno = false;
        $consulta =$objetoAccesoDato->retornarConsulta("UPDATE empleados SET correo = :correo, 
                                                        nombre = :nombre, clave = :clave, id_perfil = :id_perfil, sueldo = :sueldo, foto = :foto
                                                         WHERE id = :id");
        
        if($consulta != false)
        {
            $consulta->bindValue(':id', $id, PDO::PARAM_INT);
            $consulta->bindValue(':correo', $this->_correo, PDO::PARAM_STR);
            $consulta->bindValue(':clave', $this->_clave, PDO::PARAM_STR);
            $consulta->bindValue(':nombre', $this->_nombre, PDO::PARAM_STR);
            $consulta->bindValue(':id_perfil', $this->_id_perfil, PDO::PARAM_INT);
            $consulta->bindValue(':sueldo', $this->_sueldo, PDO::PARAM_INT);
            $consulta->bindValue(':foto', $this->_fotos, PDO::PARAM_STR);
            $retorno =true;
            $consulta->execute();
        }
        
        return $retorno;
    }
    static function Eliminar(int $id) : bool
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $retorno = false;
        $consulta =$objetoAccesoDato->retornarConsulta("DELETE FROM empleados WHERE id = :id");
        
        if($consulta != false)
        {
            $retorno =true;
            $consulta->bindValue(':id', $id, PDO::PARAM_INT);
            $consulta->execute();
        }

        return $retorno;
    }
}