// types.ts (create a new file for types)
export interface Owner {
    _id: string; // MongoDB Object ID
    id: string; // Owner ID (adjust this if necessary)
    owneremail: string; // Owner's email
    ownerpassword: string; // Owner's password (consider security implications)
    status: string; // Owner's status
  }
  

  export interface Candidate {
    candidateid: string; // Match the exact property name
    candidatename: string; // Match the exact property name
    candidateic: string; // Match the exact property name
    candidatephonenumber: string; // Match the exact property name
    candidateaddress: string; // Match the exact property name
}
