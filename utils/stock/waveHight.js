import objKeySort from "../common/objKeySort";
export default function waveHight($list, key) {
  let $up = {};
  let $length = $list.length;
  let min = $length < 46 ? 5 : $length - 45;
  if ($length - 1 < 5) {
    return $up;
  } else {
    for (let $i = $length - 1; $i > min; $i--) {
      let $h1 = $list[$i]?.[key];
      let $h2 = $list[$i - 1]?.[key];
      let $h3 = $list[$i - 2]?.[key];
      let $h4 = $list[$i - 3]?.[key];
      let $h5 = $list[$i - 4]?.[key];
      if ($h3 > $h1 && $h3 > $h2 && $h3 > $h4 && $h3 > $h5) {
        $up[$list[$i - 2]["t"]] = {
          [key]: $h3,
          v: $list[$i - 2]["v"],
          c: $list[$i - 2]["c"],
          h: $list[$i - 2]["h"],
          l: $list[$i - 2]["l"],
        };
      } else if ($h2 > $h1 && $h2 > $h3 && $h2 > $h4 && $h2 > $h5) {
        $up[$list[$i - 1]["t"]] = {
          [key]: $h2,
          v: $list[$i - 1]["v"],
          c: $list[$i - 1]["c"],
          h: $list[$i - 1]["h"],
          l: $list[$i - 1]["l"],
        };
      }
    }
    let $firstUp = getFirstObject($up);

    if ($firstUp && $list[$length - 1]?.[key] > $firstUp?.[key]) {
      $up[$list[$length - 1]["t"]] = {
        [key]: $list[$length - 1][key],
        v: $list[$length - 1]["v"],
        c: $list[$length - 1]["c"],
        h: $list[$length - 1]["h"],
        l: $list[$length - 1]["l"],
      };
      objKeySort($up);
    }
    return $up;
  }
}

function getFirstObject($up) {
  if (Object.keys($up).length > 1) {
    for (var key in $up) return $up[key];
  } else {
    return false;
  }
}
