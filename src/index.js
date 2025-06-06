import dotenv from "dotenv"
import {ApolloServer,gql} from "apollo-server"
import {ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core"
import {quotes,users} from "./db.js"
dotenv.config();


const typeDefs = gql`
       type Query{
        users:[User]
        quotes:[Quote]
       }

  type User{
        id:ID   #mandetory
        fname:String 
        lname:String 
        email:Stringc
        quotes:[Quote]
       }   
  type Quote{
        name:String,
        by:ID
  }        
`
const resolvers = {
    Query:{
        users:()=> users,
        user:(_,args)=> users.find(user=>user.id  == args.id),
        quotes:()=> quotes

    },
    User:{
        quotes:(ur)=>quotes.filter(quotes=>quotes.by == ur.id)
    }
}


const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins:[
        ApolloServerPluginLandingPageGraphQLPlayground
    ]
})

server.listen().then(({url})=>{
    console.log(`Server running on port${url}`);
    
});
