import {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLID
} from 'graphql';

export default new GraphQLInputObjectType({
    name: 'UserInput',
    fields: {
        _id: {
            type: GraphQLID
        },
        firstName: {
            type: GraphQLString
        },
        lastName: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        },
        salt: {
            type: GraphQLString
        },
        gender: {
            type: GraphQLString
        }
    }
})
