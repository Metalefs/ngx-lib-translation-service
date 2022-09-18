export function GetDescendantProps(obj:object, desc:string, value = undefined) {
  var arr = desc ? desc.split(".") : [];

  while (arr.length && obj) {
    var comp = arr.shift();
    var match = new RegExp("(.+)\\[([0-9]*)\\]").exec(comp!);

    // handle arrays
    if ((match !== null) && (match.length == 3)) {
      var arrayData = {
        arrName: match[1],
        arrIndex: match[2]
      };
      if ((obj as any)[arrayData.arrName] !== undefined) {
        if (typeof value !== 'undefined' && arr.length === 0) {
          (obj as any)[arrayData.arrName][arrayData.arrIndex] = value;
        }
        obj = (obj as any)[arrayData.arrName][arrayData.arrIndex];
      } else {
        (obj as any) = undefined;
      }

      continue;
    }

    // handle regular things
    if (typeof value !== 'undefined') {
      if ((obj as any)[comp as any] === undefined) {
        (obj as any)[comp as any] = {};
      }

      if (arr.length === 0) {
        (obj as any)[comp as any] = value;
      }
    }

    obj = (obj as any)[comp as any];
  }

  return obj;
}
