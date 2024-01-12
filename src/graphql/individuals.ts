
import { gql } from '@apollo/client'

const GET_INDIVIDUAL = gql`
  query Query($where: UserWhereInput) {
    fetchIndividuals(where: $where) {
      individualid
      firstname
      lastname
      email
      addresses {
        line1
        city
        state
        zip
      }
    }
  }
`

export {
    GET_INDIVIDUAL
}