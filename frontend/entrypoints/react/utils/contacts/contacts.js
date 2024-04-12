import localforage from 'localforage'
import { matchSorter } from 'match-sorter'
import sortBy from 'sort-by'
import sample_contacts from './sample_contacts.json'; 
 
export async function getContacts(query) {
  await fakeNetwork(`getContacts:${query}`)
  let contacts = await localforage.getItem('contacts')
  if (!contacts) contacts = []
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ['first', 'last'] })
  }
  return contacts.sort(sortBy('last', 'createdAt'))
}

export async function createContact() {
  await fakeNetwork()
  let id = Math.random().toString(36).substring(2, 9)
  let contact = { id, createdAt: Date.now() }
  let contacts = await getContacts()
  contacts.unshift(contact)
  console.log('====> contacts 1:', contacts)
  await set(contacts)
  return contact
}

export async function getContact(id) {
  await fakeNetwork(`contact:${id}`)
  let contacts = await localforage.getItem('contacts')
  let contact = contacts.find((contact) => contact.id === id)
  return contact ?? null
}

export async function updateContact(id, updates) {
  await fakeNetwork()
  let contacts = await localforage.getItem('contacts')
  let contact = contacts.find((contact) => contact.id === id)
  if (!contact) throw new Error('No contact found for', id)
  Object.assign(contact, updates)
  await set(contacts)
  return contact
}

export async function deleteContact(id) {
  let contacts = await localforage.getItem('contacts')
  let index = contacts.findIndex((contact) => contact.id === id)
  if (index > -1) {
    contacts.splice(index, 1)
    await set(contacts)
    return true
  }
  return false
}

// load dummy contacts data
export async function loadContacts() {

  // sample_contacts.json
  console.log("loadContacts() sample_contacts:", sample_contacts)

  // contacts in storage
  let storage_contacts = await localforage.getItem('contacts')
  console.log("storage_contacts:", storage_contacts)

  try {
    sample_contacts.forEach( item => {
       
      let id_found_in_storage = storage_contacts.some(i=>i.id===item.id)
      if (!id_found_in_storage) {
        storage_contacts.unshift(item) 
      }
    })
    await set(storage_contacts) 

  } catch (error) {
    console.error("Error fetching sample_contacts.JSON:", error);
  }

  // return with the updated contacts array
  return storage_contacts 
} 

function set(contacts) {
  return localforage.setItem('contacts', contacts)
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {}

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {}
  }

  if (fakeCache[key]) {
    return
  }

  fakeCache[key] = true
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800)
  })
}
