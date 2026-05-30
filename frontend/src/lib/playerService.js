import { supabase } from './supabase'

export async function createProfile(userId, name) {
  return await supabase
    .from('PROFILES')
    .insert([{
        user_id: userId,
        username: name,
        curr_count: 0,
        cum_count:0,
        upgrade_count:0
      }])
}


export async function loadProfile(userId) {
  return await supabase // starts a supabase query
    .from('PROFILES') 
    .select('*')
    .eq('user_id', userId) 
    .single()
}
// SELECT * FROM PROFILES WHERE user_id = userId LIMIT 1;


export async function updateChips(userId, chips) {
  return await supabase
    .from('PROFILES')
    .update({ chips })
    .eq('user_id', userId)
}
// UPDATE PROFILE SET chips = <chips> WHERE user_id = userId

export async function updateClickPower(userId, clickPower) {
  return await supabase
    .from('PROFILES')
    .update({ click_power: clickPower })
    .eq('user_id', userId)
}
// UPDATE PROFILE SET click_power = clickPower
