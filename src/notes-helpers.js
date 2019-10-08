
export const findFolder = (folders=[], folderId) =>
  folders.find(folder => folder.id === folderId)

export const findNote = (notes=[], note_id) =>
// eslint-disable-next-line
  notes.find(note => note.id == note_id)

export const getNotesForFolder = (notes=[], folderId) => (
  (!folderId)
    ? notes
    // eslint-disable-next-line
    : notes.filter(note => note.folder_id == folderId)
)

export const countNotesForFolder = (notes=[], folderId) =>
  notes.filter(note => note.folder_id === folderId).length
