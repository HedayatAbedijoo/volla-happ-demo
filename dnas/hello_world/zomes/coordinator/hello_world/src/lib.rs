use hdk::prelude::*;

#[hdk_extern]
pub fn hello_world(_: ()) -> ExternResult<String> {
    Ok(String::from("hello world from a Holochain app!"))
}
