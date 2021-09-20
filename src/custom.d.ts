type RootState={
    recordList:RecordItem[],
    tagList:Tag[],
    currentTag?: Tag
    createTagError:Error|null,
}
type RecordItem = {
    tags: Tag[]
    notes: string
    type: string
    amount: number
    createdAt?:string
}
type Tag = {
    id: string;
    name: string;
}

interface Window {
    store:{
        tagList: Tag[];
        createTag: (name: string) => void;
        removeTag: (id: string) => boolean
        updateTag: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
        findTag: (id: string) => Tag | undefined;
        recordList: RecordItem[];
        createRecord: (record: RecordItem) => void;
    }
}