const MAX_HISTORY_SIZE = 20;

class Template {
  static instance;

  undoHistory = [];
  redoHistory = [];
  isPushAvailable = true;

  static getInstance() {
    if (Template.instance === undefined) {
      Template.instance = new Template();
    }
    return Template.instance;
  }

  static isUndoAvailable() {
    const instance = Template.getInstance();
    return instance.undoHistory.length > 1;
  }

  static isRedoAvailable() {
    const instance = Template.getInstance();
    return instance.redoHistory.length > 0;
  }

  static push(oldTemplate) {
    let instance = Template.getInstance();
    if (instance.isPushAvailable) {
      // remove old element from the last if the history length exceeds the max length.
      if (instance.undoHistory >= MAX_HISTORY_SIZE) {
        instance.undoHistory.shift();
      }

      instance.undoHistory.push(oldTemplate);

      // clear redo history whenever new change makes.
      instance.redoHistory = [];
    }
    instance.isPushAvailable = true;
    return instance;
  }

  static redo() {
    if (Template.isRedoAvailable()) {
      const instance = Template.getInstance();
      instance.isPushAvailable = false;
      const backTemplate = instance.redoHistory.pop();
      instance.undoHistory.push(backTemplate);
      return backTemplate;
    }
  }

  static undo() {
    if (Template.isUndoAvailable()) {
      const instance = Template.getInstance();
      instance.isPushAvailable = false;
      instance.redoHistory.push(instance.undoHistory.pop());
      return instance.undoHistory[instance.undoHistory.length - 1];
    }
  }
}

export default Template;
