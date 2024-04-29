import axios from "axios";
import { serverApi } from "../../lib/config";
import { LoginInput, Member, MemberInput } from "../../lib/types/member";


class MemberService {
    private readonly path: string;
  
    constructor() {
        this.path = serverApi;
    }
    public async getTopUsers(): Promise<Member[]> {
     try{
      const url = this.path + "/member/top-users"
      console.log("Give me About data", url)
      const result = await axios.get(url);
      console.log("getTopUsers", result);

      return result.data;
     } catch (err) {
        console.log("Error, getTopUsers", err);
         throw err;
     }
    
    }
    public async getRestaurant(): Promise<Member> {
        try{
         const url = this.path + "/member/restaurant"
          console.log("url haqida", url)
         const result = await axios.get(url);
         console.log("getRestaurant", result);
         const restaurant: Member = result.data;
         return result.data;
        } catch (err) {
           console.log("Error, getRestaurant", err);
            throw err;
        }
    };

    public async signup (input: MemberInput): Promise<Member>{
        try{
            const  url = this.path + "/member/signup";
          const result = await axios.post(url, input, {withCredentials: true})
          console.log("Signup", result);

          const member: Member = result.data.member;
          console.log("member", member);
          localStorage.setItem("memberData", JSON.stringify(member));
          return member
        }
        catch(err){
            console.log("Error, signup", err);
            throw err;
        } 
    }
    public async login (input: LoginInput): Promise<Member>{
        try{
            const  url = this.path + "/member/login";
          const result = await axios.post(url, input, {withCredentials: true})
          console.log("Login", result);

          const member: Member = result.data.member;
          console.log("member", member);
          localStorage.setItem("memberData", JSON.stringify(member));
          return member
        }
        catch(err){
            console.log("Error, login", err);
            throw err;
        } 
    }
    public async loginout (): Promise<void>{
        try{
            const  url = this.path + "/member/logout";
          const result = await axios.post(url, {}, {withCredentials: true})
          console.log("Logout", result);

         
          localStorage.removeItem("memberData");
          return result.data;
        }
        catch(err){
            console.log("Error, Logout", err);
            throw err;
        } 
    }
}
export default MemberService;