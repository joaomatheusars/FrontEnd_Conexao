import axios from "axios"
import { NextResponse } from "next/server"

export const useCepService = () => {

    const getAddress = async (cep: string) => {
        
        const res = async() =>{
            try{
                const res = await axios.get(`http://viacep.com.br/ws/${cep}/json/`)
                return res
            } catch {
                return true
            }  
        }

        const value = await res()

        if (value === true){
            return value
        }

        if(value.data.erro){
            return value.data.erro
        } 

        return {
            end: value.data.logradouro,
            cep: value.data.cep,
            bairro: value.data.bairro,
            cidade: value.data.localidade,
            estado: value.data.uf
        }


    }
    return { getAddress }

}