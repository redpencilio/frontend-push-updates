import { helper } from '@ember/component/helper';

export default helper(function eDateVal(positional/*, named*/) {
  return function (event) {
    return new Date(event.target.value);
  };
});
