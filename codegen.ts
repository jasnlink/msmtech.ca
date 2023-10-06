require('dotenv').config({ path: '.env.local' });
import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: [
        {
            [`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`]: {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`
                }
            }
        }
    ],
    documents: ['./src/**/*.graphql'],
    generates: {
        './src/_generated/graphql.ts': {
            plugins: [
                'typescript',
                'typescript-operations',
                'typescript-graphql-request'
            ]
        },
        './schema.graphql': {
            plugins: ['schema-ast']
        }
    }
}

export default config