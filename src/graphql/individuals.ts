
import { gql } from '@apollo/client'

const GET_INDIVIDUAL = gql`
  query Query($where: UserWhereInput) {
    fetchIndividuals(where: $where) {
      individualid
      firstname
      lastname
      email
    }
  }
`

export {
    GET_INDIVIDUAL
}