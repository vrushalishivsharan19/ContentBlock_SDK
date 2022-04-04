import { gql } from 'graphql-request';

export const coremediaQuery = (collectionId: string): string => gql`
  {
    CoremediaCollection(id:"${collectionId}") {
      items {
        ... on CoremediaArticle {
          shortTeaserTitle
          teaserTitle
          teaserText {
            plainText
          }
          featuredMedia {
            uri
            id
            docType: contentType
            ... Images
          }
    
        }
      }
    }
  }
  fragment Images on CoremediaImage {
    picture {
      cropInfo {
        value {
          url
        }
      }
    }
  }
`;
