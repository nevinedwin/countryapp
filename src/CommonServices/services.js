import axios from 'axios'

export const getCountryDetails = async () => {
    return axios.get('https://geoenrich.arcgis.com/arcgis/rest/services/World/geoenrichmentserver/Geoenrichment/countries?f=pjson')
}