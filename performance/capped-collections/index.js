// ****************************************************************
// capped collections
// ****************************************************************
// NOTE: capped collection is a pecial type of collection which you create using createCollection command and by passing some extra (required) params

// this type f collection is used in case if you want to have only latest 1000 documents in your collection and when more documents get inserted the oldest one will gets removed automatically

// ****************************************************************
// create capped collections
// ****************************************************************
db.createCollection('capped', { capped: true, max: 1000, max: 1000 });
// so what are these three params there for?
// 1) capped, this turns a normal collection in to a capped one (required)
// 1) size, this defines the size of your collection - size in bytes (required)
// 1) max, maximum number of documents allowed in capped collection (even if size is not reached but max number is, old documents will get deleted, when new gets inserted) (optional)
