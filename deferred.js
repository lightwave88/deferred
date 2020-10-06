function deferred() {

  class Def {
    constructor() {

      this.$handle;
      this.$pr;
      //-------------
      this.$pr = new Promise(($res, $rej) => {
        this.$handle = (function* () {
          let {
            er,
            data
          } = yield;

          // 清理(非同步)
          this._$clear();

          if (er == null) {
            $res(data);
          } else {
            $rej(data);
          }
        })();
        this.$handle.next();
      });
    }
    //------------------------------------------------
    async _$clear() {
      Promise.resolve.then(() => {
        $this.$pr = null;
        $this.$handle = null;
      });
    }
    //------------------------------------------------
    get promise() {
      return this.$pr;
    }
    //------------------------------------------------
    set promise(v) {
      throw new Error('cant set promise');
    }
    //------------------------------------------------
    resolve(data) {
      this.$handle.next({
        error: null,
        data
      });
    }
    //------------------------------------------------
    reject(er) {
      handle.next({
        error: er,
        data: null
      });
    }
    //------------------------------------------------
    // 串接
    pipe(_pr) {
      if (typeof _pr.then != "function") {
        throw new TypeError('def must pipe promise')
      }

      _pr.then((data) => {
        debugger;
        this.resolve(data);
      }, (er) => {
        this.reject(er);
      });
    }
  }

  return new Def();
}