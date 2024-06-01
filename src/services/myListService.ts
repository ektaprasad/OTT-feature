import MyListModel from '../models/MyList';

class MyListService {
  async addToMyList(userId: string, itemId: string) {
    let myList = await MyListModel.findOne({ userId });

    if (!myList) {
      myList = new MyListModel({ userId, items: [] });
    }

    if (!myList.items.includes(itemId)) {
      myList.items.push(itemId);
      await myList.save();
    }

    return myList;
  }

  async removeFromMyList(userId: string, itemId: string) {
    const myList = await MyListModel.findOne({ userId });

    if (myList) {
      myList.items = myList.items.filter(item => item !== itemId);
      await myList.save();
    }

    return myList;
  }

  async listMyItems(userId: string, page: number, limit: number) {
    const myList = await MyListModel.findOne({ userId })
      .skip((page - 1) * limit)
      .limit(limit);

    if (!myList) {
      return [];
    }

    return myList.items;
  }
}

export default new MyListService();
