const { tasksCollection } = require('../firebase');

module.exports = {
  Query: {
    getTasks: async () => {
      const snapshot = await tasksCollection.get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    getTask: async (_, { id }) => {
      const doc = await tasksCollection.doc(id).get();
      if (!doc.exists) return null;
      return { id: doc.id, ...doc.data() };
    }
  },

  Mutation: {
    createTask: async (_, { title }) => {
      const docRef = await tasksCollection.add({ title, completed: false });
      const doc = await docRef.get();
      return { id: doc.id, ...doc.data() };
    },
    updateTask: async (_, { id, title, completed }) => {
      const updates = {};
      if (title !== undefined) updates.title = title;
      if (completed !== undefined) updates.completed = completed;

      await tasksCollection.doc(id).update(updates);
      const updatedDoc = await tasksCollection.doc(id).get();
      return { id: updatedDoc.id, ...updatedDoc.data() };
    },
    deleteTask: async (_, { id }) => {
      await tasksCollection.doc(id).delete();
      return true;
    }
  }
};
