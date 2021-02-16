/*! For license information please see gridstack-h5.js.LICENSE.txt */
! function (t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.GridStack = e() : t.GridStack = e()
}(self, (function () {
    return (() => {
        "use strict";
        var t = {
                21: (t, e, i) => {
                    Object.defineProperty(e, "__esModule", {
                        value: !0
                    });
                    const s = i(334),
                        r = i(270),
                        o = i(593);
                    class n extends s.GridStackDDI {
                        static get() {
                            return s.GridStackDDI.get()
                        }
                        remove(t) {
                            return this.draggable(t, "destroy").resizable(t, "destroy"), t.gridstackNode && delete t.gridstackNode._initDD, this
                        }
                    }
                    e.GridStackDD = n, r.GridStack.prototype._setupAcceptWidget = function () {
                        if (this.opts.staticGrid) return this;
                        if (!this.opts.acceptWidgets) return n.get().droppable(this.el, {
                            accept: t => t.gridstackNode && t.gridstackNode.grid === this
                        }), this;
                        let t = (t, e) => {
                            let i = e.gridstackNode,
                                s = this.getCellFromPixel({
                                    left: t.pageX,
                                    top: t.pageY
                                }, !0),
                                r = Math.max(0, s.x),
                                o = Math.max(0, s.y);
                            if (i._added) r === i.x && o === i.y || !this.engine.canMoveNode(i, r, o) || (this.engine.moveNode(i, r, o), this._updateContainerHeight());
                            else {
                                if (i.x = r, i.y = o, delete i.autoPosition, !this.engine.willItFit(i) && (i.autoPosition = !0, !this.engine.willItFit(i))) return;
                                i._added = !0, i.el = e, this.engine.cleanNodes(), this.engine.beginUpdate(i), this.engine.addNode(i), this._writePosAttr(this.placeholder, i.x, i.y, i.w, i.h), this.el.appendChild(this.placeholder), i.el = this.placeholder, i._beforeDragX = i.x, i._beforeDragY = i.y, this._updateContainerHeight()
                            }
                        };
                        return n.get().droppable(this.el, {
                            accept: t => {
                                let e = t.gridstackNode;
                                if (e && e.grid === this) return !0;
                                let i = !0;
                                if ("function" == typeof this.opts.acceptWidgets) i = this.opts.acceptWidgets(t);
                                else {
                                    let e = !0 === this.opts.acceptWidgets ? ".grid-stack-item" : this.opts.acceptWidgets;
                                    i = t.matches(e)
                                }
                                if (i && e && this.opts.maxRow) {
                                    let t = {
                                        w: e.w,
                                        h: e.h,
                                        minW: e.minW,
                                        minH: e.minH
                                    };
                                    i = this.engine.willItFit(t)
                                }
                                return i
                            }
                        }).on(this.el, "dropover", ((e, i) => {
                            let s = i.gridstackNode;
                            if (s && s.grid === this) return delete s._added, !1;
                            s || (s = this._readAttr(i)), s.grid && s.grid !== this && (s._added = !0);
                            let r = s.w || Math.round(i.offsetWidth / this.cellWidth()) || 1,
                                o = s.h || Math.round(i.offsetHeight / this.getCellHeight(!0)) || 1,
                                l = this.engine.prepareNode(Object.assign(Object.assign({}, s), {
                                    w: r,
                                    h: o,
                                    _added: !1,
                                    _temporary: !0
                                }));
                            return l._isOutOfGrid = !0, i.gridstackNode = l, i._gridstackNodeOrig = s, n.get().on(i, "drag", t), !1
                        })).on(this.el, "dropout", ((t, e) => {
                            let i = e.gridstackNode;
                            if (i && (delete i._added, i._isOutOfGrid)) return n.get().off(e, "drag"), i.el = null, this.engine.removeNode(i), this.placeholder.parentNode === this.el && this.placeholder.remove(), this._updateContainerHeight(), e.gridstackNode = e._gridstackNodeOrig, !1
                        })).on(this.el, "drop", ((t, e, i) => {
                            let s = e.gridstackNode,
                                r = !!this.placeholder.parentElement;
                            if (s && s.grid === this) return !1;
                            this.placeholder.remove();
                            let l = e._gridstackNodeOrig;
                            if (delete e._gridstackNodeOrig, r && l && l.grid && l.grid !== this) {
                                let t = l.grid;
                                t.placeholder.remove(), l.el = e, t.engine.removedNodes.push(l), t._triggerRemoveEvent()
                            }
                            if (!s) return !1;
                            if (r) {
                                const t = s._id;
                                this.engine.cleanupNode(s), s._id = t, s.grid = this
                            }
                            return n.get().off(e, "drag"), i !== e ? (i.remove(), e.gridstackNode = l, r && (e = e.cloneNode(!0))) : (e.remove(), n.get().remove(e)), !!r && (e.gridstackNode = s, s.el = e, o.Utils.removePositioningStyles(e), this._writeAttr(e, s), this.el.appendChild(e), this._updateContainerHeight(), this.engine.addedNodes.push(s), this._triggerAddEvent(), this._triggerChangeEvent(), this.engine.endUpdate(), this._gsEventHandler.dropped && this._gsEventHandler.dropped({
                                type: "dropped"
                            }, l && l.grid ? l : void 0, s), window.setTimeout((() => {
                                s.el && s.el.parentElement && this._prepareDragDropByNode(s)
                            })), !1)
                        })), this
                    }, r.GridStack.prototype._setupRemoveDrop = function () {
                        if (!this.opts.staticGrid && "string" == typeof this.opts.removable) {
                            let t = document.querySelector(this.opts.removable);
                            if (!t) return this;
                            n.get().isDroppable(t) || n.get().droppable(t, this.opts.removableOptions).on(t, "dropover", (function (t, e) {
                                let i = e.gridstackNode;
                                i && i.grid && (e.dataset.inTrashZone = "true", i.grid._setupRemovingTimeout(e))
                            })).on(t, "dropout", (function (t, e) {
                                let i = e.gridstackNode;
                                i && i.grid && (delete e.dataset.inTrashZone, i.grid._clearRemovingTimeout(e))
                            }))
                        }
                        return this
                    }, r.GridStack.prototype._setupRemovingTimeout = function (t) {
                        let e = t.gridstackNode;
                        return e && !e._removeTimeout && this.opts.removable ? (e._removeTimeout = window.setTimeout((() => {
                            t.classList.add("grid-stack-item-removing"), e._isAboutToRemove = !0
                        }), this.opts.removeTimeout), this) : this
                    }, r.GridStack.prototype._clearRemovingTimeout = function (t) {
                        let e = t.gridstackNode;
                        return e && e._removeTimeout ? (clearTimeout(e._removeTimeout), delete e._removeTimeout, t.classList.remove("grid-stack-item-removing"), delete e._isAboutToRemove, this) : this
                    }, r.GridStack.prototype._setupDragIn = function () {
                        return this.opts.staticGrid || "string" != typeof this.opts.dragIn || n.get().isDraggable(this.opts.dragIn) || n.get().dragIn(this.opts.dragIn, this.opts.dragInOptions), this
                    }, r.GridStack.prototype._prepareDragDropByNode = function (t) {
                        let e, i, s = t.el;
                        if (this.opts.staticGrid || t.locked || (t.noMove || this.opts.disableDrag) && (t.noResize || this.opts.disableResize)) return t._initDD && (n.get().remove(t.el), delete t._initDD), t.el.classList.add("ui-draggable-disabled", "ui-resizable-disabled"), this;
                        if (t._initDD) return (t.noMove || this.opts.disableDrag) && n.get().draggable(s, "disable"), (t.noResize || this.opts.disableResize) && n.get().resizable(s, "disable"), this;
                        t.el.classList.remove("ui-draggable-disabled", "ui-resizable-disabled");
                        let r = (r, o) => {
                                let l = r.target;
                                this._gsEventHandler[r.type] && this._gsEventHandler[r.type](r, l), this.engine.cleanNodes(), this.engine.beginUpdate(t), this._writePosAttr(this.placeholder, t.x, t.y, t.w, t.h), this.el.append(this.placeholder), t.el = this.placeholder, t._beforeDragX = t.x, t._beforeDragY = t.y, t._prevYPix = o.position.top, e = this.cellWidth(), i = this.getCellHeight(!0), n.get().resizable(s, "option", "minWidth", e * (t.minW || 1)), n.get().resizable(s, "option", "minHeight", i * (t.minH || 1)), t.maxW && n.get().resizable(s, "option", "maxWidth", e * t.maxW), t.maxH && n.get().resizable(s, "option", "maxHeight", i * t.maxH)
                            },
                            l = (r, n) => {
                                let l, a, h, d = Math.round(n.position.left / e),
                                    g = Math.round(n.position.top / i);
                                if ("drag" === r.type) {
                                    let e = n.position.top - t._prevYPix;
                                    if (t._prevYPix = n.position.top, o.Utils.updateScrollPosition(s, n.position, e), s.dataset.inTrashZone || t._added || this.engine.isOutside(d, g, t)) {
                                        if (t._temporaryRemoved) return;
                                        !0 === this.opts.removable && this._setupRemovingTimeout(s), d = t._beforeDragX, g = t._beforeDragY, this.placeholder.parentNode === this.el && this.placeholder.remove(), this.engine.removeNode(t), this._updateContainerHeight(), t._temporaryRemoved = !0, delete t._added
                                    } else this._clearRemovingTimeout(s), t._temporaryRemoved && (this.engine.addNode(t), this._writePosAttr(this.placeholder, d, g, l, a), this.el.appendChild(this.placeholder), t.el = this.placeholder, delete t._temporaryRemoved);
                                    if (t._lastTriedX === d && t._lastTriedY === g) return
                                } else if ("resize" === r.type) {
                                    if (d < 0) return;
                                    if (o.Utils.updateScrollResize(r, s, i), l = Math.round(n.size.width / e), a = Math.round(n.size.height / i), l === t.w && a === t.h) return;
                                    h = !0
                                }
                                this.engine.canMoveNode(t, d, g, l, a) && (t._lastTriedX = d, t._lastTriedY = g, t._lastTriedW = l, t._lastTriedH = a, this.engine.moveNode(t, d, g, l, a), h && t.subGrid && t.subGrid.onParentResize(), this._updateContainerHeight())
                            },
                            a = e => {
                                this.placeholder.parentNode === this.el && this.placeholder.remove();
                                let i = e.target;
                                if (i.gridstackNode && i.gridstackNode.grid === this) {
                                    if (t.el = i, t._isAboutToRemove) {
                                        let r = s.gridstackNode.grid;
                                        r._gsEventHandler[e.type] && r._gsEventHandler[e.type](e, i), r.engine.removedNodes.push(t), n.get().remove(s), delete s.gridstackNode, r._triggerRemoveEvent(), s.parentElement && s.remove()
                                    } else this._clearRemovingTimeout(s), t._temporaryRemoved ? (o.Utils.removePositioningStyles(i), this._writePosAttr(i, t._beforeDragX, t._beforeDragY, t.w, t.h), t.x = t._beforeDragX, t.y = t._beforeDragY, delete t._temporaryRemoved, this.engine.addNode(t)) : (o.Utils.removePositioningStyles(i), this._writePosAttr(i, t.x, t.y, t.w, t.h)), this._gsEventHandler[e.type] && this._gsEventHandler[e.type](e, i);
                                    this._updateContainerHeight(), this._triggerChangeEvent(), this.engine.endUpdate()
                                }
                            };
                        return n.get().draggable(s, {
                            start: r,
                            stop: a,
                            drag: l
                        }).resizable(s, {
                            start: r,
                            stop: a,
                            resize: l
                        }), t._initDD = !0, (t.noMove || this.opts.disableDrag) && n.get().draggable(s, "disable"), (t.noResize || this.opts.disableResize) && n.get().resizable(s, "disable"), this
                    }, r.GridStack.prototype.movable = function (t, e) {
                        return this.opts.staticGrid || r.GridStack.getElements(t).forEach((t => {
                            let i = t.gridstackNode;
                            i && !i.locked && (i.noMove = !e, i.noMove ? (n.get().draggable(t, "disable"), t.classList.remove("ui-draggable-handle")) : (this._prepareDragDropByNode(i), n.get().draggable(t, "enable"), t.classList.remove("ui-draggable-handle")))
                        })), this
                    }, r.GridStack.prototype.resizable = function (t, e) {
                        return this.opts.staticGrid || r.GridStack.getElements(t).forEach((t => {
                            let i = t.gridstackNode;
                            i && !i.locked && (i.noResize = !e, i.noResize ? n.get().resizable(t, "disable") : (this._prepareDragDropByNode(i), n.get().resizable(t, "enable")))
                        })), this
                    }, r.GridStack.prototype.disable = function () {
                        if (!this.opts.staticGrid) return this.enableMove(!1), this.enableResize(!1), this._triggerEvent("disable"), this
                    }, r.GridStack.prototype.enable = function () {
                        if (!this.opts.staticGrid) return this.enableMove(!0), this.enableResize(!0), this._triggerEvent("enable"), this
                    }, r.GridStack.prototype.enableMove = function (t, e = !0) {
                        return this.opts.staticGrid || (this.getGridItems().forEach((e => this.movable(e, t))), e && (this.opts.disableDrag = !t)), this
                    }, r.GridStack.prototype.enableResize = function (t, e = !0) {
                        return this.opts.staticGrid || (this.getGridItems().forEach((e => this.resizable(e, t))), e && (this.opts.disableResize = !t)), this
                    }
                },
                334: (t, e) => {
                    Object.defineProperty(e, "__esModule", {
                        value: !0
                    });
                    class i {
                        static registerPlugin(t) {
                            return i.ddi = new t, i.ddi
                        }
                        static get() {
                            return i.ddi || i.registerPlugin(i)
                        }
                        remove(t) {
                            return this
                        }
                    }
                    e.GridStackDDI = i
                },
                62: (t, e, i) => {
                    Object.defineProperty(e, "__esModule", {
                        value: !0
                    });
                    const s = i(593);
                    class r {
                        constructor(t = {}) {
                            this.addedNodes = [], this.removedNodes = [], this.getGridHeight = s.obsolete(this, r.prototype.getRow, "getGridHeight", "getRow", "v1.0.0"), this.column = t.column || 12, this.onChange = t.onChange, this._float = t.float, this.maxRow = t.maxRow, this.nodes = t.nodes || []
                        }
                        batchUpdate() {
                            return this.batchMode || (this.batchMode = !0, this._prevFloat = this._float, this._float = !0), this
                        }
                        commit() {
                            return this.batchMode ? (this.batchMode = !1, this._float = this._prevFloat, delete this._prevFloat, this._packNodes(), this._notify(), this) : this
                        }
                        _fixCollisions(t) {
                            this._sortNodes(-1);
                            let e = t,
                                i = Boolean(this.nodes.find((t => t.locked)));
                            for (this.float || i || (e = {
                                    x: 0,
                                    y: t.y,
                                    w: this.column,
                                    h: t.h
                                });;) {
                                let i, s = this.collide(t, e);
                                if (!s) return this;
                                if (i = s.locked ? this.moveNode(t, t.x, s.y + s.h, t.w, t.h, !0) : this.moveNode(s, s.x, t.y + t.h, s.w, s.h, !0), !i) return this
                            }
                        }
                        collide(t, e = t) {
                            return this.nodes.find((i => i !== t && s.Utils.isIntercepted(i, e)))
                        }
                        isAreaEmpty(t, e, i, s) {
                            let r = {
                                x: t || 0,
                                y: e || 0,
                                w: i || 1,
                                h: s || 1
                            };
                            return !this.collide(r)
                        }
                        compact() {
                            if (0 === this.nodes.length) return this;
                            this.batchUpdate(), this._sortNodes();
                            let t = this.nodes;
                            return this.nodes = [], t.forEach((t => {
                                t.noMove || t.locked || (t.autoPosition = !0), this.addNode(t, !1), t._dirty = !0
                            })), this.commit(), this
                        }
                        set float(t) {
                            this._float !== t && (this._float = t || !1, t || (this._packNodes(), this._notify()))
                        }
                        get float() {
                            return this._float || !1
                        }
                        _sortNodes(t) {
                            return this.nodes = s.Utils.sort(this.nodes, t, this.column), this
                        }
                        _packNodes() {
                            return this._sortNodes(), this.float ? this.nodes.forEach(((t, e) => {
                                if (t._updating || void 0 === t._packY || t.y === t._packY) return this;
                                let i = t.y;
                                for (; i >= t._packY;) {
                                    let r = {
                                        x: t.x,
                                        y: i,
                                        w: t.w,
                                        h: t.h
                                    };
                                    this.nodes.slice(0, e).find((t => s.Utils.isIntercepted(r, t))) || (t._dirty = !0, t.y = i), --i
                                }
                            })) : this.nodes.forEach(((t, e) => {
                                if (t.locked) return this;
                                for (; t.y > 0;) {
                                    let i = t.y - 1,
                                        r = 0 === e,
                                        o = {
                                            x: t.x,
                                            y: i,
                                            w: t.w,
                                            h: t.h
                                        };
                                    if (e > 0 && (r = !this.nodes.slice(0, e).find((t => s.Utils.isIntercepted(o, t)))), !r) break;
                                    t._dirty = t.y !== i, t.y = i
                                }
                            })), this
                        }
                        prepareNode(t, e) {
                            (t = t || {})._id = t._id || r._idSeq++, void 0 !== t.x && void 0 !== t.y && null !== t.x && null !== t.y || (t.autoPosition = !0);
                            let i = {
                                x: 0,
                                y: 0,
                                w: 1,
                                h: 1
                            };
                            return s.Utils.defaults(t, i), t.autoPosition || delete t.autoPosition, t.noResize || delete t.noResize, t.noMove || delete t.noMove, "string" == typeof t.x && (t.x = Number(t.x)), "string" == typeof t.y && (t.y = Number(t.y)), "string" == typeof t.w && (t.w = Number(t.w)), "string" == typeof t.h && (t.h = Number(t.h)), isNaN(t.x) && (t.x = i.x, t.autoPosition = !0), isNaN(t.y) && (t.y = i.y, t.autoPosition = !0), isNaN(t.w) && (t.w = i.w), isNaN(t.h) && (t.h = i.h), t.maxW && (t.w = Math.min(t.w, t.maxW)), t.maxH && (t.h = Math.min(t.h, t.maxH)), t.minW && (t.w = Math.max(t.w, t.minW)), t.minH && (t.h = Math.max(t.h, t.minH)), t.w > this.column ? t.w = this.column : t.w < 1 && (t.w = 1), this.maxRow && t.h > this.maxRow ? t.h = this.maxRow : t.h < 1 && (t.h = 1), t.x < 0 && (t.x = 0), t.y < 0 && (t.y = 0), t.x + t.w > this.column && (e ? t.w = this.column - t.x : t.x = this.column - t.w), this.maxRow && t.y + t.h > this.maxRow && (e ? t.h = this.maxRow - t.y : t.y = this.maxRow - t.h), t
                        }
                        getDirtyNodes(t) {
                            if (t) {
                                let t = [];
                                return this.nodes.forEach((e => {
                                    e._dirty && (e.y === e._origY && e.x === e._origX && e.w === e._origW && e.h === e._origH ? delete e._dirty : t.push(e))
                                })), t
                            }
                            return this.nodes.filter((t => t._dirty))
                        }
                        _notify(t, e = !0) {
                            if (this.batchMode) return this;
                            let i = (t = void 0 === t ? [] : Array.isArray(t) ? t : [t]).concat(this.getDirtyNodes());
                            return this.onChange && this.onChange(i, e), this
                        }
                        cleanNodes() {
                            return this.batchMode || this.nodes.forEach((t => {
                                delete t._dirty
                            })), this
                        }
                        addNode(t, e = !1) {
                            if ((t = this.prepareNode(t)).autoPosition) {
                                this._sortNodes();
                                for (let e = 0;; ++e) {
                                    let i = e % this.column,
                                        r = Math.floor(e / this.column);
                                    if (i + t.w > this.column) continue;
                                    let o = {
                                        x: i,
                                        y: r,
                                        w: t.w,
                                        h: t.h
                                    };
                                    if (!this.nodes.find((t => s.Utils.isIntercepted(o, t)))) {
                                        t.x = i, t.y = r, delete t.autoPosition;
                                        break
                                    }
                                }
                            }
                            return this.nodes.push(t), e && this.addedNodes.push(t), this._fixCollisions(t), this._packNodes(), this._notify(), t
                        }
                        removeNode(t, e = !0, i = !1) {
                            return i && this.removedNodes.push(t), t._id = null, this.nodes = this.nodes.filter((e => e !== t)), this.float || this._packNodes(), this._notify(t, e), this
                        }
                        removeAll(t = !0) {
                            return delete this._layouts, 0 === this.nodes.length || (t && this.nodes.forEach((t => {
                                t._id = null
                            })), this.removedNodes = this.nodes, this.nodes = [], this._notify(this.removedNodes, t)), this
                        }
                        canMoveNode(t, e, i, s, o) {
                            if (!this.isNodeChangedPosition(t, e, i, s, o)) return !1;
                            let n, l = this.nodes.some((t => t.locked));
                            if (!this.maxRow && !l) return !0;
                            let a = new r({
                                column: this.column,
                                float: this.float,
                                nodes: this.nodes.map((e => e === t ? (n = Object.assign({}, e), n) : Object.assign({}, e)))
                            });
                            if (!n) return !0;
                            a.moveNode(n, e, i, s, o);
                            let h = !0;
                            return l && (h = !a.nodes.some((t => t.locked && t._dirty && t !== n))), this.maxRow && h && (h = a.getRow() <= this.maxRow), h
                        }
                        willItFit(t) {
                            if (!this.maxRow) return !0;
                            let e = new r({
                                column: this.column,
                                float: this.float,
                                nodes: this.nodes.map((t => Object.assign({}, t)))
                            });
                            return e.addNode(t), e.getRow() <= this.maxRow
                        }
                        isOutside(t, e, i) {
                            if (t < 0 || t >= this.column || e < 0) return !0;
                            if (this.maxRow) return e >= this.maxRow;
                            if (this.float) return !1;
                            let s = this.getRow();
                            if (e < s || 0 === e) return !1;
                            if (e > s) return !0;
                            if (!i._temporaryRemoved) {
                                let s = new r({
                                        column: this.column,
                                        float: this.float,
                                        nodes: this.nodes.filter((t => t !== i)).map((t => Object.assign({}, t)))
                                    }),
                                    o = Object.assign(Object.assign({}, i), {
                                        x: t,
                                        y: e
                                    });
                                return s.addNode(o), o.y === i.y && o.x === i.x
                            }
                            return i._temporaryRemoved
                        }
                        isNodeChangedPosition(t, e, i, s, r) {
                            return "number" != typeof e && (e = t.x), "number" != typeof i && (i = t.y), "number" != typeof s && (s = t.w), "number" != typeof r && (r = t.h), t.maxW && (s = Math.min(s, t.maxW)), t.maxH && (r = Math.min(r, t.maxH)), t.minW && (s = Math.max(s, t.minW)), t.minH && (r = Math.max(r, t.minH)), t.x !== e || t.y !== i || t.w !== s || t.h !== r
                        }
                        moveNode(t, e, i, s, r, o) {
                            if (t.locked) return null;
                            "number" != typeof e && (e = t.x), "number" != typeof i && (i = t.y), "number" != typeof s && (s = t.w), "number" != typeof r && (r = t.h);
                            let n = t.w !== s || t.h !== r,
                                l = {
                                    x: e,
                                    y: i,
                                    w: s,
                                    h: r,
                                    maxW: t.maxW,
                                    maxH: t.maxH,
                                    minW: t.minW,
                                    minH: t.minH
                                };
                            return l = this.prepareNode(l, n), t.x === l.x && t.y === l.y && t.w === l.w && t.h === l.h ? null : (t._dirty = !0, t.x = t._lastTriedX = l.x, t.y = t._lastTriedY = l.y, t.w = t._lastTriedW = l.w, t.h = t._lastTriedH = l.h, this._fixCollisions(t), o || (this._packNodes(), this._notify()), t)
                        }
                        getRow() {
                            return this.nodes.reduce(((t, e) => Math.max(t, e.y + e.h)), 0)
                        }
                        beginUpdate(t) {
                            return t._updating || (t._updating = !0, this.nodes.forEach((t => {
                                t._packY = t.y
                            }))), this
                        }
                        endUpdate() {
                            let t = this.nodes.find((t => t._updating));
                            return t && (delete t._updating, this.nodes.forEach((t => {
                                delete t._packY
                            }))), this
                        }
                        save(t = !0) {
                            let e = [];
                            return s.Utils.sort(this.nodes), this.nodes.forEach((i => {
                                let s = {};
                                for (let t in i) "_" !== t[0] && null !== i[t] && void 0 !== i[t] && (s[t] = i[t]);
                                t || delete s.el, delete s.grid, s.autoPosition || delete s.autoPosition, s.noResize || delete s.noResize, s.noMove || delete s.noMove, s.locked || delete s.locked, e.push(s)
                            })), e
                        }
                        layoutsNodesChange(t) {
                            return !this._layouts || this._ignoreLayoutsNodeChange || this._layouts.forEach(((e, i) => {
                                if (!e || i === this.column) return this;
                                i < this.column ? this._layouts[i] = void 0 : t.forEach((t => {
                                    let s = e.find((e => e._id === t._id));
                                    if (!s) return this;
                                    let r = i / this.column;
                                    t.y !== t._origY && (s.y += t.y - t._origY), t.x !== t._origX && (s.x = Math.round(t.x * r)), t.w !== t._origW && (s.w = Math.round(t.w * r))
                                }))
                            })), this
                        }
                        updateNodeWidths(t, e, i, r = "moveScale") {
                            if (!this.nodes.length || t === e) return this;
                            if (this.cacheLayout(this.nodes, t), 1 === e && i && i.length) {
                                let t = 0;
                                i.forEach((e => {
                                    e.x = 0, e.w = 1, e.y = Math.max(e.y, t), t = e.y + e.h
                                }))
                            } else i = s.Utils.sort(this.nodes, -1, t);
                            let o = this._layouts[e] || [],
                                n = this._layouts.length - 1;
                            0 === o.length && e > t && e < n && (o = this._layouts[n] || [], o.length && (t = n, o.forEach((t => {
                                let e = i.findIndex((e => e._id === t._id)); - 1 !== e && (i[e].x = t.x, i[e].y = t.y, i[e].w = t.w)
                            })), o = []));
                            let l = [];
                            if (o.forEach((t => {
                                    let e = i.findIndex((e => e._id === t._id)); - 1 !== e && (i[e].x = t.x, i[e].y = t.y, i[e].w = t.w, l.push(i[e]), i.splice(e, 1))
                                })), i.length)
                                if ("function" == typeof r) r(e, t, l, i);
                                else {
                                    let s = e / t,
                                        o = "move" === r || "moveScale" === r,
                                        n = "scale" === r || "moveScale" === r;
                                    i.forEach((i => {
                                        i.x = 1 === e ? 0 : o ? Math.round(i.x * s) : Math.min(i.x, e - 1), i.w = 1 === e || 1 === t ? 1 : n ? Math.round(i.w * s) || 1 : Math.min(i.w, e), l.push(i)
                                    })), i = []
                                } return l = s.Utils.sort(l, -1, e), this._ignoreLayoutsNodeChange = !0, this.batchUpdate(), this.nodes = [], l.forEach((t => {
                                this.addNode(t, !1), t._dirty = !0
                            }), this), this.commit(), delete this._ignoreLayoutsNodeChange, this
                        }
                        saveInitial() {
                            return this.nodes.forEach((t => {
                                t._origX = t.x, t._origY = t.y, t._origW = t.w, t._origH = t.h, delete t._dirty
                            })), this
                        }
                        cacheLayout(t, e, i = !1) {
                            let s = [];
                            return t.forEach(((t, e) => {
                                t._id = t._id || r._idSeq++, s[e] = {
                                    x: t.x,
                                    y: t.y,
                                    w: t.w,
                                    _id: t._id
                                }
                            })), this._layouts = i ? [] : this._layouts || [], this._layouts[e] = s, this
                        }
                        cleanupNode(t) {
                            for (let e in t) "_" === e[0] && delete t[e];
                            return this
                        }
                    }
                    e.GridStackEngine = r, r._idSeq = 1
                },
                270: (t, e, i) => {
                    function s(t) {
                        for (var i in t) e.hasOwnProperty(i) || (e[i] = t[i])
                    }
                    Object.defineProperty(e, "__esModule", {
                        value: !0
                    });
                    const r = i(62),
                        o = i(593),
                        n = i(334);
                    s(i(593)), s(i(62)), s(i(334));
                    const l = {
                        column: 12,
                        minRow: 0,
                        maxRow: 0,
                        itemClass: "grid-stack-item",
                        placeholderClass: "grid-stack-placeholder",
                        placeholderText: "",
                        handle: ".grid-stack-item-content",
                        handleClass: null,
                        styleInHead: !1,
                        cellHeight: "auto",
                        cellHeightThrottle: 100,
                        margin: 10,
                        auto: !0,
                        minWidth: 768,
                        float: !1,
                        staticGrid: !1,
                        animate: !0,
                        alwaysShowResizeHandle: !1,
                        resizable: {
                            autoHide: !0,
                            handles: "se"
                        },
                        draggable: {
                            handle: ".grid-stack-item-content",
                            scroll: !1,
                            appendTo: "body"
                        },
                        dragIn: void 0,
                        dragInOptions: {
                            revert: "invalid",
                            handle: ".grid-stack-item-content",
                            scroll: !1,
                            appendTo: "body"
                        },
                        disableDrag: !1,
                        disableResize: !1,
                        rtl: "auto",
                        removable: !1,
                        removableOptions: {
                            accept: ".grid-stack-item"
                        },
                        removeTimeout: 2e3,
                        marginUnit: "px",
                        cellHeightUnit: "px",
                        disableOneColumnMode: !1,
                        oneColumnModeDomSort: !1
                    };
                    class a {
                        constructor(t, e = {}) {
                            this._gsEventHandler = {}, this.el = t, e = e || {}, o.obsoleteOpts(e, "verticalMargin", "margin", "v2.0"), o.obsoleteAttr(this.el, "data-gs-current-height", "gs-current-row", "v1.0.0"), e.row && (e.minRow = e.maxRow = e.row, delete e.row);
                            let i = o.Utils.toNumber(t.getAttribute("gs-row")),
                                s = Object.assign(Object.assign({}, l), {
                                    column: o.Utils.toNumber(t.getAttribute("gs-column")) || 12,
                                    minRow: i || o.Utils.toNumber(t.getAttribute("gs-min-row")) || 0,
                                    maxRow: i || o.Utils.toNumber(t.getAttribute("gs-max-row")) || 0,
                                    staticGrid: o.Utils.toBool(t.getAttribute("gs-static")) || !1,
                                    _styleSheetClass: "grid-stack-instance-" + (1e4 * Math.random()).toFixed(0),
                                    alwaysShowResizeHandle: e.alwaysShowResizeHandle || !1,
                                    resizable: {
                                        autoHide: !e.alwaysShowResizeHandle,
                                        handles: "se"
                                    },
                                    draggable: {
                                        handle: (e.handleClass ? "." + e.handleClass : e.handle ? e.handle : "") || ".grid-stack-item-content",
                                        scroll: !1,
                                        appendTo: "body"
                                    },
                                    removableOptions: {
                                        accept: "." + (e.itemClass || "grid-stack-item")
                                    }
                                });
                            t.getAttribute("gs-animate") && (s.animate = o.Utils.toBool(t.getAttribute("gs-animate"))), this.opts = o.Utils.defaults(e, s), e = null, this.initMargin(), 1 !== this.opts.column && !this.opts.disableOneColumnMode && this._widthOrContainer() <= this.opts.minWidth && (this._prevColumn = this.opts.column, this.opts.column = 1), "auto" === this.opts.rtl && (this.opts.rtl = "rtl" === t.style.direction), this.opts.rtl && this.el.classList.add("grid-stack-rtl");
                            let n = o.Utils.closestByClass(this.el, l.itemClass);
                            if (n && n.gridstackNode && (this.opts._isNested = n.gridstackNode, this.opts._isNested.subGrid = this, this.el.classList.add("grid-stack-nested")), this._isAutoCellHeight = "auto" === this.opts.cellHeight, this._isAutoCellHeight || "initial" === this.opts.cellHeight ? this.cellHeight(void 0, !1) : this.cellHeight(this.opts.cellHeight, !1), this.el.classList.add(this.opts._styleSheetClass), this._setStaticClass(), this.engine = new r.GridStackEngine({
                                    column: this.opts.column,
                                    float: this.opts.float,
                                    maxRow: this.opts.maxRow,
                                    onChange: (t, e = !0) => {
                                        let i = 0;
                                        this.engine.nodes.forEach((t => {
                                            i = Math.max(i, t.y + t.h)
                                        })), t.forEach((t => {
                                            let i = t.el;
                                            e && null === t._id ? i && i.parentNode && i.parentNode.removeChild(i) : this._writePosAttr(i, t.x, t.y, t.w, t.h)
                                        })), this._updateStyles(!1, i)
                                    }
                                }), this.opts.auto) {
                                this.batchUpdate();
                                let t = [];
                                this.getGridItems().forEach((e => {
                                    let i = parseInt(e.getAttribute("gs-x")),
                                        s = parseInt(e.getAttribute("gs-y"));
                                    t.push({
                                        el: e,
                                        i: (Number.isNaN(i) ? 1e3 : i) + (Number.isNaN(s) ? 1e3 : s) * this.opts.column
                                    })
                                })), t.sort((t => t.i)).forEach((t => this._prepareElement(t.el))), this.commit()
                            }
                            this.engine.saveInitial(), this.setAnimation(this.opts.animate), this._updateStyles(), 12 != this.opts.column && this.el.classList.add("grid-stack-" + this.opts.column), this._setupDragIn(), this._setupRemoveDrop(), this._setupAcceptWidget(), this._updateWindowResizeEvent()
                        }
                        static init(t = {}, e = ".grid-stack") {
                            let i = a.getGridElement(e);
                            return i ? (i.gridstack || (i.gridstack = new a(i, Object.assign({}, t))), i.gridstack) : ("string" == typeof e ? console.error('GridStack.initAll() no grid was found with selector "' + e + '" - element missing or wrong selector ?\nNote: ".grid-stack" is required for proper CSS styling and drag/drop, and is the default selector.') : console.error("GridStack.init() no grid element was passed."), null)
                        }
                        static initAll(t = {}, e = ".grid-stack") {
                            let i = [];
                            return a.getGridElements(e).forEach((e => {
                                e.gridstack || (e.gridstack = new a(e, Object.assign({}, t))), i.push(e.gridstack)
                            })), 0 === i.length && console.error('GridStack.initAll() no grid was found with selector "' + e + '" - element missing or wrong selector ?\nNote: ".grid-stack" is required for proper CSS styling and drag/drop, and is the default selector.'), i
                        }
                        static addGrid(t, e = {}) {
                            if (!t) return null;
                            let i = document.implementation.createHTMLDocument();
                            i.body.innerHTML = `<div class="grid-stack ${e.class||""}"></div>`;
                            let s = i.body.children[0];
                            t.append(s);
                            let r = a.init(e, s);
                            return e.children && r.load(e.children), r
                        }
                        get placeholder() {
                            if (!this._placeholder) {
                                let t = document.createElement("div");
                                t.className = "placeholder-content", this.opts.placeholderText && (t.innerHTML = this.opts.placeholderText), this._placeholder = document.createElement("div"), this._placeholder.classList.add(this.opts.placeholderClass, l.itemClass, this.opts.itemClass), this.placeholder.appendChild(t)
                            }
                            return this._placeholder
                        }
                        addWidget(t, e) {
                            if (arguments.length > 2) {
                                console.warn("gridstack.ts: `addWidget(el, x, y, width...)` is deprecated. Use `addWidget({x, y, w, content, ...})`. It will be removed soon");
                                let e = arguments,
                                    i = 1,
                                    s = {
                                        x: e[i++],
                                        y: e[i++],
                                        w: e[i++],
                                        h: e[i++],
                                        autoPosition: e[i++],
                                        minW: e[i++],
                                        maxW: e[i++],
                                        minH: e[i++],
                                        maxH: e[i++],
                                        id: e[i++]
                                    };
                                return this.addWidget(t, s)
                            }
                            let i;
                            if ("string" == typeof t) {
                                let e = document.implementation.createHTMLDocument();
                                e.body.innerHTML = t, i = e.body.children[0]
                            } else if (0 === arguments.length || 1 === arguments.length && (void 0 !== (s = t).x || void 0 !== s.y || void 0 !== s.w || void 0 !== s.h || void 0 !== s.content)) {
                                let s = t && t.content || "";
                                e = t;
                                let r = document.implementation.createHTMLDocument();
                                r.body.innerHTML = `<div class="grid-stack-item ${this.opts.itemClass||""}"><div class="grid-stack-item-content">${s}</div></div>`, i = r.body.children[0]
                            } else i = t;
                            var s;
                            let r = this._readAttr(i);
                            return e = Object.assign({}, e || {}), o.Utils.defaults(e, r), this.engine.prepareNode(e), this._writeAttr(i, e), this._insertNotAppend ? this.el.prepend(i) : this.el.appendChild(i), this._prepareElement(i, !0, e), this._updateContainerHeight(), this._triggerAddEvent(), this._triggerChangeEvent(), i
                        }
                        save(t = !0, e = !1) {
                            let i = this.engine.save(t);
                            if (t && i.forEach((t => {
                                    if (t.el && !t.subGrid) {
                                        let e = t.el.querySelector(".grid-stack-item-content");
                                        t.content = e ? e.innerHTML : void 0, t.content || delete t.content, delete t.el
                                    }
                                })), e) {
                                i.forEach((i => {
                                    i.subGrid && (i.subGrid = i.subGrid.save(t, e))
                                }));
                                let s = Object.assign({}, this.opts);
                                return s.marginBottom === s.marginTop && s.marginRight === s.marginLeft && s.marginTop === s.marginRight && (s.margin = s.marginTop, delete s.marginTop, delete s.marginRight, delete s.marginBottom, delete s.marginLeft), s.rtl === ("rtl" === this.el.style.direction) && (s.rtl = "auto"), this._isAutoCellHeight && (s.cellHeight = "auto"), o.Utils.removeInternalAndSame(s, l), s.children = i, s
                            }
                            return i
                        }
                        load(t, e = !0) {
                            let i = a.Utils.sort(t, -1, this._prevColumn || this.opts.column);
                            this._insertNotAppend = !0, this._prevColumn && this._prevColumn !== this.opts.column && i.some((t => t.x + t.w > this.opts.column)) && (this._ignoreLayoutsNodeChange = !0, this.engine.cacheLayout(i, this._prevColumn, !0));
                            let s = [];
                            return this.batchUpdate(), e && [...this.engine.nodes].forEach((t => {
                                i.find((e => t.id === e.id)) || ("function" == typeof e ? e(this, t, !1) : (s.push(t), this.removeWidget(t.el, !0, !1)))
                            })), i.forEach((t => {
                                let i = t.id || 0 === t.id ? this.engine.nodes.find((e => e.id === t.id)) : void 0;
                                if (i) {
                                    if (this.update(i.el, t), t.subGrid && t.subGrid.children) {
                                        let e = i.el.querySelector(".grid-stack");
                                        e && e.gridstack && (e.gridstack.load(t.subGrid.children), this._insertNotAppend = !0)
                                    }
                                } else if (e && (t = "function" == typeof e ? e(this, t, !0).gridstackNode : this.addWidget(t).gridstackNode).subGrid) {
                                    let e = t.el.querySelector(".grid-stack-item-content");
                                    t.subGrid = a.addGrid(e, t.subGrid)
                                }
                            })), this.engine.removedNodes = s, this.commit(), delete this._ignoreLayoutsNodeChange, delete this._insertNotAppend, this
                        }
                        batchUpdate() {
                            return this.engine.batchUpdate(), this
                        }
                        getCellHeight(t = !1) {
                            if (this.opts.cellHeight && "auto" !== this.opts.cellHeight && (!t || !this.opts.cellHeightUnit || "px" === this.opts.cellHeightUnit)) return this.opts.cellHeight;
                            let e = this.el.querySelector("." + this.opts.itemClass),
                                i = o.Utils.toNumber(e.getAttribute("gs-h"));
                            return Math.round(e.offsetHeight / i)
                        }
                        cellHeight(t, e = !0) {
                            if (e && void 0 !== t && this._isAutoCellHeight !== ("auto" === t) && (this._isAutoCellHeight = "auto" === t, this._updateWindowResizeEvent()), "initial" !== t && "auto" !== t || (t = void 0), void 0 === t) {
                                let e = -this.opts.marginRight - this.opts.marginLeft + this.opts.marginTop + this.opts.marginBottom;
                                t = this.cellWidth() + e
                            }
                            let i = o.Utils.parseHeight(t);
                            return this.opts.cellHeightUnit === i.unit && this.opts.cellHeight === i.h || (this.opts.cellHeightUnit = i.unit, this.opts.cellHeight = i.h, e && this._updateStyles(!0, this.getRow())), this
                        }
                        cellWidth() {
                            return this._widthOrContainer() / this.opts.column
                        }
                        _widthOrContainer() {
                            return this.el.clientWidth || this.el.parentElement.clientWidth || window.innerWidth
                        }
                        commit() {
                            return this.engine.commit(), this._triggerRemoveEvent(), this._triggerAddEvent(), this._triggerChangeEvent(), this
                        }
                        compact() {
                            return this.engine.compact(), this._triggerChangeEvent(), this
                        }
                        column(t, e = "moveScale") {
                            if (this.opts.column === t) return this;
                            let i, s = this.opts.column;
                            return 1 === t ? this._prevColumn = s : delete this._prevColumn, this.el.classList.remove("grid-stack-" + s), this.el.classList.add("grid-stack-" + t), this.opts.column = this.engine.column = t, 1 === t && this.opts.oneColumnModeDomSort && (i = [], this.getGridItems().forEach((t => {
                                t.gridstackNode && i.push(t.gridstackNode)
                            })), i.length || (i = void 0)), this.engine.updateNodeWidths(s, t, i, e), this._ignoreLayoutsNodeChange = !0, this._triggerChangeEvent(), delete this._ignoreLayoutsNodeChange, this
                        }
                        getColumn() {
                            return this.opts.column
                        }
                        getGridItems() {
                            return Array.from(this.el.children).filter((t => t.matches("." + this.opts.itemClass) && !t.matches("." + this.opts.placeholderClass)))
                        }
                        destroy(t = !0) {
                            if (this.el) return this._updateWindowResizeEvent(!0), this.setStatic(!0), t ? this.el.parentNode.removeChild(this.el) : (this.removeAll(t), this.el.classList.remove(this.opts._styleSheetClass)), this._removeStylesheet(), delete this.opts._isNested, delete this.opts, delete this._placeholder, delete this.engine, delete this.el.gridstack, delete this.el, this
                        }
                        float(t) {
                            return this.engine.float = t, this._triggerChangeEvent(), this
                        }
                        getFloat() {
                            return this.engine.float
                        }
                        getCellFromPixel(t, e = !1) {
                            let i, s = this.el.getBoundingClientRect();
                            i = e ? {
                                top: s.top + document.documentElement.scrollTop,
                                left: s.left
                            } : {
                                top: this.el.offsetTop,
                                left: this.el.offsetLeft
                            };
                            let r = t.left - i.left,
                                o = t.top - i.top,
                                n = s.width / this.opts.column,
                                l = s.height / parseInt(this.el.getAttribute("gs-current-row"));
                            return {
                                x: Math.floor(r / n),
                                y: Math.floor(o / l)
                            }
                        }
                        getRow() {
                            return Math.max(this.engine.getRow(), this.opts.minRow)
                        }
                        isAreaEmpty(t, e, i, s) {
                            return this.engine.isAreaEmpty(t, e, i, s)
                        }
                        makeWidget(t) {
                            let e = a.getElement(t);
                            return this._prepareElement(e, !0), this._updateContainerHeight(), this._triggerAddEvent(), this._triggerChangeEvent(), e
                        }
                        on(t, e) {
                            if (-1 !== t.indexOf(" ")) return t.split(" ").forEach((t => this.on(t, e))), this;
                            if ("change" === t || "added" === t || "removed" === t || "enable" === t || "disable" === t) {
                                let i = "enable" === t || "disable" === t;
                                this._gsEventHandler[t] = i ? t => e(t) : t => e(t, t.detail), this.el.addEventListener(t, this._gsEventHandler[t])
                            } else "dragstart" === t || "dragstop" === t || "resizestart" === t || "resizestop" === t || "dropped" === t ? this._gsEventHandler[t] = e : console.log("GridStack.on(" + t + ') event not supported, but you can still use $(".grid-stack").on(...) while jquery-ui is still used internally.');
                            return this
                        }
                        off(t) {
                            return -1 !== t.indexOf(" ") ? (t.split(" ").forEach((t => this.off(t))), this) : ("change" !== t && "added" !== t && "removed" !== t && "enable" !== t && "disable" !== t || this._gsEventHandler[t] && this.el.removeEventListener(t, this._gsEventHandler[t]), delete this._gsEventHandler[t], this)
                        }
                        removeWidget(t, e = !0, i = !0) {
                            return a.getElements(t).forEach((t => {
                                if (t.parentElement !== this.el) return;
                                let s = t.gridstackNode;
                                s || (s = this.engine.nodes.find((e => t === e.el))), s && (delete t.gridstackNode, n.GridStackDDI.get().remove(t), this.engine.removeNode(s, e, i), e && t.parentElement && t.remove())
                            })), i && (this._triggerRemoveEvent(), this._triggerChangeEvent()), this
                        }
                        removeAll(t = !0) {
                            return this.engine.nodes.forEach((t => {
                                delete t.el.gridstackNode, n.GridStackDDI.get().remove(t.el)
                            })), this.engine.removeAll(t), this._triggerRemoveEvent(), this
                        }
                        setAnimation(t) {
                            return t ? this.el.classList.add("grid-stack-animate") : this.el.classList.remove("grid-stack-animate"), this
                        }
                        setStatic(t) {
                            return this.opts.staticGrid === t || (this.opts.staticGrid = t, this.engine.nodes.forEach((t => this._prepareDragDropByNode(t))), this._setStaticClass()), this
                        }
                        update(t, e) {
                            if (arguments.length > 2) {
                                console.warn("gridstack.ts: `update(el, x, y, w, h)` is deprecated. Use `update({x, w, content, ...})`. It will be removed soon");
                                let i = arguments,
                                    s = 1;
                                return e = {
                                    x: i[s++],
                                    y: i[s++],
                                    w: i[s++],
                                    h: i[s++]
                                }, this.update(t, e)
                            }
                            return a.getElements(t).forEach((t => {
                                if (!t || !t.gridstackNode) return;
                                let i = t.gridstackNode,
                                    s = Object.assign({}, e);
                                delete s.autoPosition;
                                let r, o = ["x", "y", "w", "h"];
                                if (o.some((t => void 0 !== s[t] && s[t] !== i[t])) && (r = {}, o.forEach((t => {
                                        r[t] = void 0 !== s[t] ? s[t] : i[t], delete s[t]
                                    }))), !r && (s.minW || s.minH || s.maxW || s.maxH) && (r = {}), s.content) {
                                    let e = t.querySelector(".grid-stack-item-content");
                                    e && e.innerHTML !== s.content && (e.innerHTML = s.content), delete s.content
                                }
                                let n = !1,
                                    l = !1;
                                for (const t in s) "_" !== t[0] && i[t] !== s[t] && (i[t] = s[t], n = !0, l = l || !this.opts.staticGrid && ("noResize" === t || "noMove" === t || "locked" === t));
                                r && (this.engine.cleanNodes(), this.engine.beginUpdate(i), this.engine.moveNode(i, r.x, r.y, r.w, r.h), this._updateContainerHeight(), this._triggerChangeEvent(), this.engine.endUpdate()), n && this._writeAttr(t, i), l && this._prepareDragDropByNode(i)
                            })), this
                        }
                        margin(t) {
                            if (!("string" == typeof t && t.split(" ").length > 1)) {
                                let e = o.Utils.parseHeight(t);
                                if (this.opts.marginUnit === e.unit && this.opts.margin === e.h) return
                            }
                            return this.opts.margin = t, this.opts.marginTop = this.opts.marginBottom = this.opts.marginLeft = this.opts.marginRight = void 0, this.initMargin(), this._updateStyles(!0), this
                        }
                        getMargin() {
                            return this.opts.margin
                        }
                        willItFit(t) {
                            if (arguments.length > 1) {
                                console.warn("gridstack.ts: `willItFit(x,y,w,h,autoPosition)` is deprecated. Use `willItFit({x, y,...})`. It will be removed soon");
                                let t = arguments,
                                    e = 0,
                                    i = {
                                        x: t[e++],
                                        y: t[e++],
                                        w: t[e++],
                                        h: t[e++],
                                        autoPosition: t[e++]
                                    };
                                return this.willItFit(i)
                            }
                            return this.engine.willItFit(t)
                        }
                        _triggerChangeEvent() {
                            if (this.engine.batchMode) return this;
                            let t = this.engine.getDirtyNodes(!0);
                            return t && t.length && (this._ignoreLayoutsNodeChange || this.engine.layoutsNodesChange(t), this._triggerEvent("change", t)), this.engine.saveInitial(), this
                        }
                        _triggerAddEvent() {
                            return this.engine.batchMode || this.engine.addedNodes && this.engine.addedNodes.length > 0 && (this._ignoreLayoutsNodeChange || this.engine.layoutsNodesChange(this.engine.addedNodes), this.engine.addedNodes.forEach((t => {
                                delete t._dirty
                            })), this._triggerEvent("added", this.engine.addedNodes), this.engine.addedNodes = []), this
                        }
                        _triggerRemoveEvent() {
                            return this.engine.batchMode || this.engine.removedNodes && this.engine.removedNodes.length > 0 && (this._triggerEvent("removed", this.engine.removedNodes), this.engine.removedNodes = []), this
                        }
                        _triggerEvent(t, e) {
                            let i = e ? new CustomEvent(t, {
                                bubbles: !1,
                                detail: e
                            }) : new Event(t);
                            return this.el.dispatchEvent(i), this
                        }
                        _removeStylesheet() {
                            return this._styles && (o.Utils.removeStylesheet(this._styles._id), delete this._styles), this
                        }
                        _updateStyles(t = !1, e) {
                            if (t && this._removeStylesheet(), this._updateContainerHeight(), 0 === this.opts.cellHeight) return this;
                            let i = this.opts.cellHeight,
                                s = this.opts.cellHeightUnit,
                                r = `.${this.opts._styleSheetClass} > .${this.opts.itemClass}`;
                            if (!this._styles) {
                                let t = "gridstack-style-" + (1e5 * Math.random()).toFixed(),
                                    e = this.opts.styleInHead ? void 0 : this.el.parentNode;
                                if (this._styles = o.Utils.createStylesheet(t, e), !this._styles) return this;
                                this._styles._id = t, this._styles._max = 0, o.Utils.addCSSRule(this._styles, r, `min-height: ${i}${s}`);
                                let n = this.opts.marginTop + this.opts.marginUnit,
                                    l = this.opts.marginBottom + this.opts.marginUnit,
                                    a = this.opts.marginRight + this.opts.marginUnit,
                                    h = this.opts.marginLeft + this.opts.marginUnit,
                                    d = `${r} > .grid-stack-item-content`,
                                    g = `.${this.opts._styleSheetClass} > .grid-stack-placeholder > .placeholder-content`;
                                o.Utils.addCSSRule(this._styles, d, `top: ${n}; right: ${a}; bottom: ${l}; left: ${h};`), o.Utils.addCSSRule(this._styles, g, `top: ${n}; right: ${a}; bottom: ${l}; left: ${h};`), o.Utils.addCSSRule(this._styles, `${r} > .ui-resizable-ne`, `right: ${a}`), o.Utils.addCSSRule(this._styles, `${r} > .ui-resizable-e`, `right: ${a}`), o.Utils.addCSSRule(this._styles, `${r} > .ui-resizable-se`, `right: ${a}; bottom: ${l}`), o.Utils.addCSSRule(this._styles, `${r} > .ui-resizable-nw`, `left: ${h}`), o.Utils.addCSSRule(this._styles, `${r} > .ui-resizable-w`, `left: ${h}`), o.Utils.addCSSRule(this._styles, `${r} > .ui-resizable-sw`, `left: ${h}; bottom: ${l}`)
                            }
                            if ((e = e || this._styles._max) > this._styles._max) {
                                let t = t => i * t + s;
                                for (let i = this._styles._max + 1; i <= e; i++) {
                                    let e = t(i);
                                    o.Utils.addCSSRule(this._styles, `${r}[gs-y="${i-1}"]`, `top: ${t(i-1)}`), o.Utils.addCSSRule(this._styles, `${r}[gs-h="${i}"]`, `height: ${e}`), o.Utils.addCSSRule(this._styles, `${r}[gs-min-h="${i}"]`, `min-height: ${e}`), o.Utils.addCSSRule(this._styles, `${r}[gs-max-h="${i}"]`, `max-height: ${e}`)
                                }
                                this._styles._max = e
                            }
                            return this
                        }
                        _updateContainerHeight() {
                            if (!this.engine || this.engine.batchMode) return this;
                            let t = this.getRow(),
                                e = parseInt(getComputedStyle(this.el)["min-height"]);
                            if (e > 0) {
                                let i = Math.round(e / this.getCellHeight(!0));
                                t < i && (t = i)
                            }
                            if (this.el.setAttribute("gs-current-row", String(t)), 0 === t) return this.el.style.removeProperty("height"), this;
                            let i = this.opts.cellHeight,
                                s = this.opts.cellHeightUnit;
                            return i ? (this.el.style.height = t * i + s, this) : this
                        }
                        _prepareElement(t, e = !1, i) {
                            i || (t.classList.add(this.opts.itemClass), i = this._readAttr(t)), t.gridstackNode = i, i.el = t, i.grid = this;
                            let s = Object.assign({}, i);
                            return i = this.engine.addNode(i, e), o.Utils.same(i, s) || this._writeAttr(t, i), this._prepareDragDropByNode(i), this
                        }
                        _writePosAttr(t, e, i, s, r) {
                            return null != e && t.setAttribute("gs-x", String(e)), null != i && t.setAttribute("gs-y", String(i)), s && t.setAttribute("gs-w", String(s)), r && t.setAttribute("gs-h", String(r)), this
                        }
                        _writeAttr(t, e) {
                            if (!e) return this;
                            this._writePosAttr(t, e.x, e.y, e.w, e.h);
                            let i = {
                                autoPosition: "gs-auto-position",
                                minW: "gs-min-w",
                                minH: "gs-min-h",
                                maxW: "gs-max-w",
                                maxH: "gs-max-h",
                                noResize: "gs-no-resize",
                                noMove: "gs-no-move",
                                locked: "gs-locked",
                                id: "gs-id",
                                resizeHandles: "gs-resize-handles"
                            };
                            for (const s in i) e[s] ? t.setAttribute(i[s], String(e[s])) : t.removeAttribute(i[s]);
                            return this
                        }
                        _readAttr(t) {
                            let e = {};
                            e.x = o.Utils.toNumber(t.getAttribute("gs-x")), e.y = o.Utils.toNumber(t.getAttribute("gs-y")), e.w = o.Utils.toNumber(t.getAttribute("gs-w")), e.h = o.Utils.toNumber(t.getAttribute("gs-h")), e.maxW = o.Utils.toNumber(t.getAttribute("gs-max-w")), e.minW = o.Utils.toNumber(t.getAttribute("gs-min-w")), e.maxH = o.Utils.toNumber(t.getAttribute("gs-max-h")), e.minH = o.Utils.toNumber(t.getAttribute("gs-min-h")), e.autoPosition = o.Utils.toBool(t.getAttribute("gs-auto-position")), e.noResize = o.Utils.toBool(t.getAttribute("gs-no-resize")), e.noMove = o.Utils.toBool(t.getAttribute("gs-no-move")), e.locked = o.Utils.toBool(t.getAttribute("gs-locked")), e.resizeHandles = t.getAttribute("gs-resize-handles"), e.id = t.getAttribute("gs-id");
                            for (const t in e) {
                                if (!e.hasOwnProperty(t)) return;
                                e[t] || 0 === e[t] || delete e[t]
                            }
                            return e
                        }
                        _setStaticClass() {
                            let t = ["grid-stack-static"];
                            return this.opts.staticGrid ? (this.el.classList.add(...t), this.el.setAttribute("gs-static", "true")) : (this.el.classList.remove(...t), this.el.removeAttribute("gs-static")), this
                        }
                        onParentResize() {
                            if (!this.el || !this.el.clientWidth) return;
                            let t = !this.opts.disableOneColumnMode && this.el.clientWidth <= this.opts.minWidth,
                                e = !1;
                            return !this._oneColumnMode != !t && (this._oneColumnMode = t, e = !0, this.opts.animate && this.setAnimation(!1), this.column(t ? 1 : this._prevColumn), this.opts.animate && this.setAnimation(!0)), this._isAutoCellHeight && (!e && this.opts.cellHeightThrottle ? (this._cellHeightThrottle || (this._cellHeightThrottle = o.Utils.throttle((() => this.cellHeight()), this.opts.cellHeightThrottle)), this._cellHeightThrottle()) : this.cellHeight()), this.engine.nodes.forEach((t => {
                                t.subGrid && t.subGrid.onParentResize()
                            })), this
                        }
                        _updateWindowResizeEvent(t = !1) {
                            const e = (this._isAutoCellHeight || !this.opts.disableOneColumnMode) && !this.opts._isNested;
                            return t || !e || this._windowResizeBind ? !t && e || !this._windowResizeBind || (window.removeEventListener("resize", this._windowResizeBind), delete this._windowResizeBind) : (this._windowResizeBind = this.onParentResize.bind(this), window.addEventListener("resize", this._windowResizeBind)), this
                        }
                        static getElement(t = ".grid-stack-item") {
                            return o.Utils.getElement(t)
                        }
                        static getElements(t = ".grid-stack-item") {
                            return o.Utils.getElements(t)
                        }
                        static getGridElement(t) {
                            return a.getElement(t)
                        }
                        static getGridElements(t) {
                            return o.Utils.getElements(t)
                        }
                        initMargin() {
                            let t, e = 0,
                                i = [];
                            return "string" == typeof this.opts.margin && (i = this.opts.margin.split(" ")), 2 === i.length ? (this.opts.marginTop = this.opts.marginBottom = i[0], this.opts.marginLeft = this.opts.marginRight = i[1]) : 4 === i.length ? (this.opts.marginTop = i[0], this.opts.marginRight = i[1], this.opts.marginBottom = i[2], this.opts.marginLeft = i[3]) : (t = o.Utils.parseHeight(this.opts.margin), this.opts.marginUnit = t.unit, e = this.opts.margin = t.h), void 0 === this.opts.marginTop ? this.opts.marginTop = e : (t = o.Utils.parseHeight(this.opts.marginTop), this.opts.marginTop = t.h, delete this.opts.margin), void 0 === this.opts.marginBottom ? this.opts.marginBottom = e : (t = o.Utils.parseHeight(this.opts.marginBottom), this.opts.marginBottom = t.h, delete this.opts.margin), void 0 === this.opts.marginRight ? this.opts.marginRight = e : (t = o.Utils.parseHeight(this.opts.marginRight), this.opts.marginRight = t.h, delete this.opts.margin), void 0 === this.opts.marginLeft ? this.opts.marginLeft = e : (t = o.Utils.parseHeight(this.opts.marginLeft), this.opts.marginLeft = t.h, delete this.opts.margin), this.opts.marginUnit = t.unit, this.opts.marginTop === this.opts.marginBottom && this.opts.marginLeft === this.opts.marginRight && this.opts.marginTop === this.opts.marginRight && (this.opts.margin = this.opts.marginTop), this
                        }
                        movable(t, e) {
                            return this
                        }
                        resizable(t, e) {
                            return this
                        }
                        disable() {
                            return this
                        }
                        enable() {
                            return this
                        }
                        enableMove(t, e = !0) {
                            return this
                        }
                        enableResize(t, e = !0) {
                            return this
                        }
                        _setupAcceptWidget() {
                            return this
                        }
                        _setupRemoveDrop() {
                            return this
                        }
                        _setupRemovingTimeout(t) {
                            return this
                        }
                        _clearRemovingTimeout(t) {
                            return this
                        }
                        _setupDragIn() {
                            return this
                        }
                        _prepareDragDropByNode(t) {
                            return this
                        }
                        locked(t, e) {
                            return this.update(t, {
                                locked: e
                            })
                        }
                        maxWidth(t, e) {
                            return this.update(t, {
                                maxW: e
                            })
                        }
                        minWidth(t, e) {
                            return this.update(t, {
                                minW: e
                            })
                        }
                        maxHeight(t, e) {
                            return this.update(t, {
                                maxH: e
                            })
                        }
                        minHeight(t, e) {
                            return this.update(t, {
                                minH: e
                            })
                        }
                        move(t, e, i) {
                            return this.update(t, {
                                x: e,
                                y: i
                            })
                        }
                        resize(t, e, i) {
                            return this.update(t, {
                                w: e,
                                h: i
                            })
                        }
                    }
                    e.GridStack = a, a.Utils = o.Utils, a.Engine = r.GridStackEngine
                },
                861: (t, e) => {
                    Object.defineProperty(e, "__esModule", {
                        value: !0
                    }), e.DDBaseImplement = class {
                        constructor() {
                            this._disabled = !1, this._eventRegister = {}
                        }
                        get disabled() {
                            return this._disabled
                        }
                        on(t, e) {
                            this._eventRegister[t] = e
                        }
                        off(t) {
                            delete this._eventRegister[t]
                        }
                        enable() {
                            this._disabled = !1
                        }
                        disable() {
                            this._disabled = !0
                        }
                        destroy() {
                            delete this._eventRegister
                        }
                        triggerEvent(t, e) {
                            if (!this.disabled && this._eventRegister) return this._eventRegister[t] ? this._eventRegister[t](e) : void 0
                        }
                    }
                },
                311: (t, e, i) => {
                    Object.defineProperty(e, "__esModule", {
                        value: !0
                    });
                    const s = i(849),
                        r = i(943),
                        o = i(861);
                    class n extends o.DDBaseImplement {
                        constructor(t, e = {}) {
                            super(), this.dragging = !1, this.ui = () => {
                                const t = this.el.parentElement.getBoundingClientRect(),
                                    e = this.helper.getBoundingClientRect();
                                return {
                                    position: {
                                        top: e.top - t.top,
                                        left: e.left - t.left
                                    }
                                }
                            }, this.el = t, this.option = e;
                            let i = e.handle.substring(1);
                            this.dragEl = t.classList.contains(i) ? t : t.querySelector(e.handle) || t, this._dragStart = this._dragStart.bind(this), this._drag = this._drag.bind(this), this._dragEnd = this._dragEnd.bind(this), this._dragFollow = this._dragFollow.bind(this), this.enable()
                        }
                        on(t, e) {
                            super.on(t, e)
                        }
                        off(t) {
                            super.off(t)
                        }
                        enable() {
                            super.enable(), this.dragEl.draggable = !0, this.dragEl.addEventListener("dragstart", this._dragStart), this.el.classList.remove("ui-draggable-disabled"), this.el.classList.add("ui-draggable")
                        }
                        disable(t = !1) {
                            super.disable(), this.dragEl.removeAttribute("draggable"), this.dragEl.removeEventListener("dragstart", this._dragStart), this.el.classList.remove("ui-draggable"), t || this.el.classList.add("ui-draggable-disabled")
                        }
                        destroy() {
                            this.dragging && this._dragEnd({}), this.disable(!0), delete this.el, delete this.helper, delete this.option, super.destroy()
                        }
                        updateOption(t) {
                            return Object.keys(t).forEach((e => this.option[e] = t[e])), this
                        }
                        _dragStart(t) {
                            s.DDManager.dragElement = this, this.helper = this._createHelper(t), this._setupHelperContainmentStyle(), this.dragOffset = this._getDragOffset(t, this.el, this.helperContainment);
                            const e = r.DDUtils.initEvent(t, {
                                target: this.el,
                                type: "dragstart"
                            });
                            this.helper !== this.el ? this._setupDragFollowNodeNotifyStart(e) : this.dragFollowTimer = window.setTimeout((() => {
                                delete this.dragFollowTimer, this._setupDragFollowNodeNotifyStart(e)
                            }), 0), this._cancelDragGhost(t)
                        }
                        _setupDragFollowNodeNotifyStart(t) {
                            return this._setupHelperStyle(), document.addEventListener("dragover", this._drag, n.dragEventListenerOption), this.dragEl.addEventListener("dragend", this._dragEnd), this.option.start && this.option.start(t, this.ui()), this.dragging = !0, this.helper.classList.add("ui-draggable-dragging"), this.triggerEvent("dragstart", t), this
                        }
                        _drag(t) {
                            t.preventDefault(), this._dragFollow(t);
                            const e = r.DDUtils.initEvent(t, {
                                target: this.el,
                                type: "drag"
                            });
                            this.option.drag && this.option.drag(e, this.ui()), this.triggerEvent("drag", e)
                        }
                        _dragEnd(t) {
                            if (this.dragFollowTimer) return clearTimeout(this.dragFollowTimer), void delete this.dragFollowTimer;
                            this.paintTimer && cancelAnimationFrame(this.paintTimer), document.removeEventListener("dragover", this._drag, n.dragEventListenerOption), this.dragEl.removeEventListener("dragend", this._dragEnd), this.dragging = !1, this.helper.classList.remove("ui-draggable-dragging"), this.helperContainment.style.position = this.parentOriginStylePosition || null, this.helper === this.el ? this._removeHelperStyle() : this.helper.remove();
                            const e = r.DDUtils.initEvent(t, {
                                target: this.el,
                                type: "dragstop"
                            });
                            this.option.stop && this.option.stop(e), this.triggerEvent("dragstop", e), delete s.DDManager.dragElement, delete this.helper
                        }
                        _createHelper(t) {
                            let e = this.el;
                            return "function" == typeof this.option.helper ? e = this.option.helper.apply(this.el, t) : "clone" === this.option.helper && (e = r.DDUtils.clone(this.el)), document.body.contains(e) || r.DDUtils.appendTo(e, "parent" === this.option.appendTo ? this.el.parentNode : this.option.appendTo), e === this.el && (this.dragElementOriginStyle = n.originStyleProp.map((t => this.el.style[t]))), e
                        }
                        _setupHelperStyle() {
                            return this.helper.style.pointerEvents = "none", this.helper.style.width = this.dragOffset.width + "px", this.helper.style.height = this.dragOffset.height + "px", this.helper.style.willChange = "left, top", this.helper.style.transition = "none", this.helper.style.position = this.option.basePosition || n.basePosition, this.helper.style.zIndex = "1000", setTimeout((() => {
                                this.helper && (this.helper.style.transition = null)
                            }), 0), this
                        }
                        _removeHelperStyle() {
                            let t = this.helper ? this.helper.gridstackNode : void 0;
                            return t && t._isAboutToRemove || n.originStyleProp.forEach((t => {
                                this.helper.style[t] = this.dragElementOriginStyle[t] || null
                            })), delete this.dragElementOriginStyle, this
                        }
                        _dragFollow(t) {
                            this.paintTimer && cancelAnimationFrame(this.paintTimer), this.paintTimer = requestAnimationFrame((() => {
                                delete this.paintTimer;
                                const e = this.dragOffset;
                                let i = {
                                    left: 0,
                                    top: 0
                                };
                                if ("absolute" === this.helper.style.position) {
                                    const {
                                        left: t,
                                        top: e
                                    } = this.helperContainment.getBoundingClientRect();
                                    i = {
                                        left: t,
                                        top: e
                                    }
                                }
                                this.helper.style.left = t.clientX + e.offsetLeft - i.left + "px", this.helper.style.top = t.clientY + e.offsetTop - i.top + "px"
                            }))
                        }
                        _setupHelperContainmentStyle() {
                            return this.helperContainment = this.helper.parentElement, "fixed" !== this.option.basePosition && (this.parentOriginStylePosition = this.helperContainment.style.position, window.getComputedStyle(this.helperContainment).position.match(/static/) && (this.helperContainment.style.position = "relative")), this
                        }
                        _cancelDragGhost(t) {
                            let e = document.createElement("div");
                            return e.style.width = "1px", e.style.height = "1px", document.body.appendChild(e), t.dataTransfer.setDragImage(e, 0, 0), setTimeout((() => document.body.removeChild(e))), t.stopPropagation(), this
                        }
                        _getDragOffset(t, e, i) {
                            let s = 0,
                                o = 0;
                            if (i) {
                                const t = document.createElement("div");
                                r.DDUtils.addElStyles(t, {
                                    opacity: "0",
                                    position: "fixed",
                                    top: "0px",
                                    left: "0px",
                                    width: "1px",
                                    height: "1px",
                                    zIndex: "-999999"
                                }), i.appendChild(t);
                                const e = t.getBoundingClientRect();
                                i.removeChild(t), s = e.left, o = e.top
                            }
                            const n = e.getBoundingClientRect();
                            return {
                                left: n.left,
                                top: n.top,
                                offsetLeft: -t.clientX + n.left - s,
                                offsetTop: -t.clientY + n.top - o,
                                width: n.width,
                                height: n.height
                            }
                        }
                    }
                    e.DDDraggable = n, n.basePosition = "absolute", n.dragEventListenerOption = !0, n.originStyleProp = ["transition", "pointerEvents", "position", "left", "top", "opacity", "zIndex", "width", "height", "willChange"]
                },
                54: (t, e, i) => {
                    Object.defineProperty(e, "__esModule", {
                        value: !0
                    });
                    const s = i(849),
                        r = i(861),
                        o = i(943);
                    class n extends r.DDBaseImplement {
                        constructor(t, e = {}) {
                            super(), this.el = t, this.option = e, this._dragEnter = this._dragEnter.bind(this), this._dragOver = this._dragOver.bind(this), this._dragLeave = this._dragLeave.bind(this), this._drop = this._drop.bind(this), this.el.classList.add("ui-droppable"), this.el.addEventListener("dragenter", this._dragEnter), this._setupAccept()
                        }
                        on(t, e) {
                            super.on(t, e)
                        }
                        off(t) {
                            super.off(t)
                        }
                        enable() {
                            this.disabled && (super.enable(), this.el.classList.remove("ui-droppable-disabled"), this.el.addEventListener("dragenter", this._dragEnter))
                        }
                        disable(t = !1) {
                            this.disabled || (super.disable(), t || this.el.classList.add("ui-droppable-disabled"), this.el.removeEventListener("dragenter", this._dragEnter))
                        }
                        destroy() {
                            this.moving && this._removeLeaveCallbacks(), this.disable(!0), this.el.classList.remove("ui-droppable"), this.el.classList.remove("ui-droppable-disabled"), delete this.moving, super.destroy()
                        }
                        updateOption(t) {
                            return Object.keys(t).forEach((e => this.option[e] = t[e])), this._setupAccept(), this
                        }
                        _dragEnter(t) {
                            if (!this._canDrop()) return;
                            this.moving = !0, t.preventDefault();
                            const e = o.DDUtils.initEvent(t, {
                                target: this.el,
                                type: "dropover"
                            });
                            this.option.over && this.option.over(e, this._ui(s.DDManager.dragElement)), this.triggerEvent("dropover", e), this.el.addEventListener("dragover", this._dragOver), this.el.addEventListener("drop", this._drop), this.el.addEventListener("dragleave", this._dragLeave), this.el.classList.add("ui-droppable-over")
                        }
                        _dragOver(t) {
                            t.preventDefault(), t.stopPropagation()
                        }
                        _dragLeave(t) {
                            if (!this.el.contains(t.relatedTarget) && (this._removeLeaveCallbacks(), this.moving)) {
                                t.preventDefault();
                                const e = o.DDUtils.initEvent(t, {
                                    target: this.el,
                                    type: "dropout"
                                });
                                this.option.out && this.option.out(e, this._ui(s.DDManager.dragElement)), this.triggerEvent("dropout", e)
                            }
                        }
                        _drop(t) {
                            if (!this.moving) return;
                            t.preventDefault();
                            const e = o.DDUtils.initEvent(t, {
                                target: this.el,
                                type: "drop"
                            });
                            this.option.drop && this.option.drop(e, this._ui(s.DDManager.dragElement)), this.triggerEvent("drop", e), this._removeLeaveCallbacks()
                        }
                        _removeLeaveCallbacks() {
                            this.el.removeEventListener("dragleave", this._dragLeave), this.el.classList.remove("ui-droppable-over"), this.moving && (this.el.removeEventListener("dragover", this._dragOver), this.el.removeEventListener("drop", this._drop))
                        }
                        _canDrop() {
                            return s.DDManager.dragElement && (!this.accept || this.accept(s.DDManager.dragElement.el))
                        }
                        _setupAccept() {
                            return this.option.accept && "string" == typeof this.option.accept ? this.accept = t => t.matches(this.option.accept) : this.accept = this.option.accept, this
                        }
                        _ui(t) {
                            return Object.assign({
                                draggable: t.el
                            }, t.ui())
                        }
                    }
                    e.DDDroppable = n
                },
                485: (t, e, i) => {
                    Object.defineProperty(e, "__esModule", {
                        value: !0
                    });
                    const s = i(97),
                        r = i(311),
                        o = i(54);
                    class n {
                        constructor(t) {
                            this.el = t
                        }
                        static init(t) {
                            return t.ddElement || (t.ddElement = new n(t)), t.ddElement
                        }
                        on(t, e) {
                            return this.ddDraggable && ["drag", "dragstart", "dragstop"].indexOf(t) > -1 ? this.ddDraggable.on(t, e) : this.ddDroppable && ["drop", "dropover", "dropout"].indexOf(t) > -1 ? this.ddDroppable.on(t, e) : this.ddResizable && ["resizestart", "resize", "resizestop"].indexOf(t) > -1 && this.ddResizable.on(t, e), this
                        }
                        off(t) {
                            return this.ddDraggable && ["drag", "dragstart", "dragstop"].indexOf(t) > -1 ? this.ddDraggable.off(t) : this.ddDroppable && ["drop", "dropover", "dropout"].indexOf(t) > -1 ? this.ddDroppable.off(t) : this.ddResizable && ["resizestart", "resize", "resizestop"].indexOf(t) > -1 && this.ddResizable.off(t), this
                        }
                        setupDraggable(t) {
                            return this.ddDraggable ? this.ddDraggable.updateOption(t) : this.ddDraggable = new r.DDDraggable(this.el, t), this
                        }
                        cleanDraggable() {
                            return this.ddDraggable && (this.ddDraggable.destroy(), delete this.ddDraggable), this
                        }
                        setupResizable(t) {
                            return this.ddResizable ? this.ddResizable.updateOption(t) : this.ddResizable = new s.DDResizable(this.el, t), this
                        }
                        cleanResizable() {
                            return this.ddResizable && (this.ddResizable.destroy(), delete this.ddResizable), this
                        }
                        setupDroppable(t) {
                            return this.ddDroppable ? this.ddDroppable.updateOption(t) : this.ddDroppable = new o.DDDroppable(this.el, t), this
                        }
                        cleanDroppable() {
                            return this.ddDroppable && (this.ddDroppable.destroy(), delete this.ddDroppable), this
                        }
                    }
                    e.DDElement = n
                },
                849: (t, e) => {
                    Object.defineProperty(e, "__esModule", {
                        value: !0
                    }), e.DDManager = class {}
                },
                680: (t, e) => {
                    Object.defineProperty(e, "__esModule", {
                        value: !0
                    });
                    class i {
                        constructor(t, e, i) {
                            this.moving = !1, this.host = t, this.dir = e, this.option = i, this._mouseDown = this._mouseDown.bind(this), this._mouseMove = this._mouseMove.bind(this), this._mouseUp = this._mouseUp.bind(this), this._init()
                        }
                        _init() {
                            const t = document.createElement("div");
                            return t.classList.add("ui-resizable-handle"), t.classList.add(`${i.prefix}${this.dir}`), t.style.zIndex = "100", t.style.userSelect = "none", this.el = t, this.host.appendChild(this.el), this.el.addEventListener("mousedown", this._mouseDown), this
                        }
                        destroy() {
                            return this.moving && this._mouseUp(this.mouseDownEvent), this.el.removeEventListener("mousedown", this._mouseDown), this.host.removeChild(this.el), delete this.el, delete this.host, this
                        }
                        _mouseDown(t) {
                            t.preventDefault(), this.mouseDownEvent = t, document.addEventListener("mousemove", this._mouseMove, !0), document.addEventListener("mouseup", this._mouseUp)
                        }
                        _mouseMove(t) {
                            let e = this.mouseDownEvent;
                            !this.moving && Math.abs(t.x - e.x) + Math.abs(t.y - e.y) > 2 ? (this.moving = !0, this._triggerEvent("start", this.mouseDownEvent)) : this.moving && this._triggerEvent("move", t)
                        }
                        _mouseUp(t) {
                            this.moving && this._triggerEvent("stop", t), document.removeEventListener("mousemove", this._mouseMove, !0), document.removeEventListener("mouseup", this._mouseUp), delete this.moving, delete this.mouseDownEvent
                        }
                        _triggerEvent(t, e) {
                            return this.option[t] && this.option[t](e), this
                        }
                    }
                    e.DDResizableHandle = i, i.prefix = "ui-resizable-"
                },
                97: (t, e, i) => {
                    Object.defineProperty(e, "__esModule", {
                        value: !0
                    });
                    const s = i(680),
                        r = i(861),
                        o = i(943),
                        n = i(593);
                    class l extends r.DDBaseImplement {
                        constructor(t, e = {}) {
                            super(), this._showHandlers = () => {
                                this.el.classList.remove("ui-resizable-autohide")
                            }, this._hideHandlers = () => {
                                this.el.classList.add("ui-resizable-autohide")
                            }, this._ui = () => {
                                const t = this.el.parentElement.getBoundingClientRect(),
                                    e = {
                                        width: this.originalRect.width,
                                        height: this.originalRect.height + this.scrolled,
                                        left: this.originalRect.left,
                                        top: this.originalRect.top - this.scrolled
                                    },
                                    i = this.temporalRect || e;
                                return {
                                    position: {
                                        left: i.left - t.left,
                                        top: i.top - t.top
                                    },
                                    size: {
                                        width: i.width,
                                        height: i.height
                                    }
                                }
                            }, this.el = t, this.option = e, this.enable(), this._setupAutoHide(), this._setupHandlers()
                        }
                        on(t, e) {
                            super.on(t, e)
                        }
                        off(t) {
                            super.off(t)
                        }
                        enable() {
                            super.enable(), this.el.classList.add("ui-resizable"), this.el.classList.remove("ui-resizable-disabled")
                        }
                        disable() {
                            super.disable(), this.el.classList.add("ui-resizable-disabled"), this.el.classList.remove("ui-resizable")
                        }
                        destroy() {
                            this._removeHandlers(), this.option.autoHide && (this.el.removeEventListener("mouseover", this._showHandlers), this.el.removeEventListener("mouseout", this._hideHandlers)), this.el.classList.remove("ui-resizable"), delete this.el, super.destroy()
                        }
                        updateOption(t) {
                            let e = t.handles && t.handles !== this.option.handles,
                                i = t.autoHide && t.autoHide !== this.option.autoHide;
                            return Object.keys(t).forEach((e => this.option[e] = t[e])), e && (this._removeHandlers(), this._setupHandlers()), i && this._setupAutoHide(), this
                        }
                        _setupAutoHide() {
                            return this.option.autoHide ? (this.el.classList.add("ui-resizable-autohide"), this.el.addEventListener("mouseover", this._showHandlers), this.el.addEventListener("mouseout", this._hideHandlers)) : (this.el.classList.remove("ui-resizable-autohide"), this.el.removeEventListener("mouseover", this._showHandlers), this.el.removeEventListener("mouseout", this._hideHandlers)), this
                        }
                        _setupHandlers() {
                            let t = this.option.handles || "e,s,se";
                            return "all" === t && (t = "n,e,s,w,se,sw,ne,nw"), this.handlers = t.split(",").map((t => t.trim())).map((t => new s.DDResizableHandle(this.el, t, {
                                start: t => {
                                    this._resizeStart(t)
                                },
                                stop: t => {
                                    this._resizeStop(t)
                                },
                                move: e => {
                                    this._resizing(e, t)
                                }
                            }))), this
                        }
                        _resizeStart(t) {
                            this.originalRect = this.el.getBoundingClientRect(), this.scrollEl = n.Utils.getScrollParent(this.el), this.scrollY = this.scrollEl.scrollTop, this.startEvent = t, this._setupHelper(), this._applyChange();
                            const e = o.DDUtils.initEvent(t, {
                                type: "resizestart",
                                target: this.el
                            });
                            return this.option.start && this.option.start(e, this._ui()), this.el.classList.add("ui-resizable-resizing"), this.triggerEvent("resizestart", e), this
                        }
                        _resizing(t, e) {
                            this.scrolled = this.scrollEl.scrollTop - this.scrollY, this.temporalRect = this._getChange(t, e), this._applyChange();
                            const i = o.DDUtils.initEvent(t, {
                                type: "resize",
                                target: this.el
                            });
                            return this.option.resize && this.option.resize(i, this._ui()), this.triggerEvent("resize", i), this
                        }
                        _resizeStop(t) {
                            const e = o.DDUtils.initEvent(t, {
                                type: "resizestop",
                                target: this.el
                            });
                            return this.option.stop && this.option.stop(e), this.el.classList.remove("ui-resizable-resizing"), this.triggerEvent("resizestop", e), this._cleanHelper(), delete this.startEvent, delete this.originalRect, delete this.temporalRect, delete this.scrollY, delete this.scrolled, this
                        }
                        _setupHelper() {
                            return this.elOriginStyleVal = l._originStyleProp.map((t => this.el.style[t])), this.parentOriginStylePosition = this.el.parentElement.style.position, window.getComputedStyle(this.el.parentElement).position.match(/static/) && (this.el.parentElement.style.position = "relative"), this.el.style.position = this.option.basePosition || "absolute", this.el.style.opacity = "0.8", this.el.style.zIndex = "1000", this
                        }
                        _cleanHelper() {
                            return l._originStyleProp.forEach(((t, e) => {
                                this.el.style[t] = this.elOriginStyleVal[e] || null
                            })), this.el.parentElement.style.position = this.parentOriginStylePosition || null, this
                        }
                        _getChange(t, e) {
                            const i = this.startEvent,
                                s = {
                                    width: this.originalRect.width,
                                    height: this.originalRect.height + this.scrolled,
                                    left: this.originalRect.left,
                                    top: this.originalRect.top - this.scrolled
                                },
                                r = t.clientX - i.clientX,
                                o = t.clientY - i.clientY;
                            e.indexOf("e") > -1 && (s.width += t.clientX - i.clientX), e.indexOf("s") > -1 && (s.height += t.clientY - i.clientY), e.indexOf("w") > -1 && (s.width -= r, s.left += r), e.indexOf("n") > -1 && (s.height -= o, s.top += o);
                            const n = this._getReShapeSize(s.width, s.height);
                            return s.width !== n.width && (e.indexOf("w") > -1 && (s.left += s.width - n.width), s.width = n.width), s.height !== n.height && (e.indexOf("n") > -1 && (s.top += s.height - n.height), s.height = n.height), s
                        }
                        _getReShapeSize(t, e) {
                            const i = this.option.maxWidth || Number.MAX_SAFE_INTEGER,
                                s = this.option.minWidth || t,
                                r = this.option.maxHeight || Number.MAX_SAFE_INTEGER,
                                o = this.option.minHeight || e;
                            return {
                                width: Math.min(i, Math.max(s, t)),
                                height: Math.min(r, Math.max(o, e))
                            }
                        }
                        _applyChange() {
                            let t = {
                                left: 0,
                                top: 0,
                                width: 0,
                                height: 0
                            };
                            if ("absolute" === this.el.style.position) {
                                const e = this.el.parentElement,
                                    {
                                        left: i,
                                        top: s
                                    } = e.getBoundingClientRect();
                                t = {
                                    left: i,
                                    top: s,
                                    width: 0,
                                    height: 0
                                }
                            }
                            return this.temporalRect ? (Object.keys(this.temporalRect).forEach((e => {
                                const i = this.temporalRect[e];
                                this.el.style[e] = i - t[e] + "px"
                            })), this) : this
                        }
                        _removeHandlers() {
                            return this.handlers.forEach((t => t.destroy())), delete this.handlers, this
                        }
                    }
                    e.DDResizable = l, l._originStyleProp = ["width", "height", "position", "left", "top", "opacity", "zIndex"]
                },
                943: (t, e) => {
                    Object.defineProperty(e, "__esModule", {
                        value: !0
                    });
                    class i {
                        static clone(t) {
                            const e = t.cloneNode(!0);
                            return e.removeAttribute("id"), e
                        }
                        static appendTo(t, e) {
                            let i;
                            i = "string" == typeof e ? document.querySelector(e) : e, i && i.append(t)
                        }
                        static setPositionRelative(t) {
                            /^(?:r|a|f)/.test(window.getComputedStyle(t).position) || (t.style.position = "relative")
                        }
                        static addElStyles(t, e) {
                            if (e instanceof Object)
                                for (const i in e) e.hasOwnProperty(i) && (Array.isArray(e[i]) ? e[i].forEach((e => {
                                    t.style[i] = e
                                })) : t.style[i] = e[i])
                        }
                        static initEvent(t, e) {
                            const i = {
                                    type: e.type
                                },
                                s = {
                                    button: 0,
                                    which: 0,
                                    buttons: 1,
                                    bubbles: !0,
                                    cancelable: !0,
                                    target: e.target ? e.target : t.target
                                };
                            return t.dataTransfer && (i.dataTransfer = t.dataTransfer), ["altKey", "ctrlKey", "metaKey", "shiftKey"].forEach((e => i[e] = t[e])), ["pageX", "pageY", "clientX", "clientY", "screenX", "screenY"].forEach((e => i[e] = t[e])), Object.assign(Object.assign({}, i), s)
                        }
                    }
                    e.DDUtils = i, i.isEventSupportPassiveOption = (() => {
                        let t = !1,
                            e = () => {};
                        return document.addEventListener("test", e, {
                            get passive() {
                                return t = !0, !0
                            }
                        }), document.removeEventListener("test", e), t
                    })()
                },
                761: (t, e, i) => {
                    Object.defineProperty(e, "__esModule", {
                        value: !0
                    });
                    const s = i(849),
                        r = i(485),
                        o = i(21),
                        n = i(593);
                    ! function (t) {
                        for (var i in t) e.hasOwnProperty(i) || (e[i] = t[i])
                    }(i(21));
                    class l extends o.GridStackDD {
                        resizable(t, e, i, s) {
                            return this._getDDElements(t).forEach((t => {
                                if ("disable" === e || "enable" === e) t.ddResizable && t.ddResizable[e]();
                                else if ("destroy" === e) t.ddResizable && t.cleanResizable();
                                else if ("option" === e) t.setupResizable({
                                    [i]: s
                                });
                                else {
                                    const i = t.el.gridstackNode.grid;
                                    let s = t.el.getAttribute("gs-resize-handles") ? t.el.getAttribute("gs-resize-handles") : i.opts.resizable.handles;
                                    t.setupResizable(Object.assign(Object.assign(Object.assign({}, i.opts.resizable), {
                                        handles: s
                                    }), {
                                        start: e.start,
                                        stop: e.stop,
                                        resize: e.resize
                                    }))
                                }
                            })), this
                        }
                        draggable(t, e, i, s) {
                            return this._getDDElements(t).forEach((t => {
                                if ("disable" === e || "enable" === e) t.ddDraggable && t.ddDraggable[e]();
                                else if ("destroy" === e) t.ddDraggable && t.cleanDraggable();
                                else if ("option" === e) t.setupDraggable({
                                    [i]: s
                                });
                                else {
                                    const i = t.el.gridstackNode.grid;
                                    t.setupDraggable(Object.assign(Object.assign({}, i.opts.draggable), {
                                        containment: i.opts._isNested && !i.opts.dragOut ? i.el.parentElement : i.opts.draggable.containment || null,
                                        start: e.start,
                                        stop: e.stop,
                                        drag: e.drag
                                    }))
                                }
                            })), this
                        }
                        dragIn(t, e) {
                            return this._getDDElements(t).forEach((t => t.setupDraggable(e))), this
                        }
                        droppable(t, e, i, s) {
                            return "function" != typeof e.accept || e._accept || (e._accept = e.accept, e.accept = t => e._accept(t)), this._getDDElements(t).forEach((t => {
                                "disable" === e || "enable" === e ? t.ddDroppable && t.ddDroppable[e]() : "destroy" === e ? t.ddDroppable && t.cleanDroppable() : "option" === e ? t.setupDroppable({
                                    [i]: s
                                }) : t.setupDroppable(e)
                            })), this
                        }
                        isDroppable(t) {
                            return t && t.ddElement && t.ddElement.ddDroppable && !t.ddElement.ddDroppable.disabled
                        }
                        isDraggable(t) {
                            return t && t.ddElement && t.ddElement.ddDraggable && !t.ddElement.ddDraggable.disabled
                        }
                        isResizable(t) {
                            return t && t.ddElement && t.ddElement.ddResizable && !t.ddElement.ddResizable.disabled
                        }
                        on(t, e, i) {
                            return this._getDDElements(t).forEach((t => t.on(e, (t => {
                                i(t, s.DDManager.dragElement ? s.DDManager.dragElement.el : t.target, s.DDManager.dragElement ? s.DDManager.dragElement.helper : null)
                            })))), this
                        }
                        off(t, e) {
                            return this._getDDElements(t).forEach((t => t.off(e))), this
                        }
                        _getDDElements(t, e = !0) {
                            let i = n.Utils.getElements(t);
                            if (!i.length) return [];
                            let s = i.map((t => t.ddElement || (e ? r.DDElement.init(t) : null)));
                            return e || s.filter((t => t)), s
                        }
                    }
                    e.GridStackDDNative = l, o.GridStackDD.registerPlugin(l)
                },
                117: (t, e, i) => {
                    function s(t) {
                        for (var i in t) e.hasOwnProperty(i) || (e[i] = t[i])
                    }
                    Object.defineProperty(e, "__esModule", {
                        value: !0
                    }), s(i(593)), s(i(62)), s(i(334)), s(i(270)), s(i(761))
                },
                593: (t, e) => {
                    Object.defineProperty(e, "__esModule", {
                        value: !0
                    }), e.obsolete = function (t, e, i, s, r) {
                        let o = (...o) => (console.warn("gridstack.js: Function `" + i + "` is deprecated in " + r + " and has been replaced with `" + s + "`. It will be **completely** removed in v1.0"), e.apply(t, o));
                        return o.prototype = e.prototype, o
                    }, e.obsoleteOpts = function (t, e, i, s) {
                        void 0 !== t[e] && (t[i] = t[e], console.warn("gridstack.js: Option `" + e + "` is deprecated in " + s + " and has been replaced with `" + i + "`. It will be **completely** removed in v1.0"))
                    }, e.obsoleteOptsDel = function (t, e, i, s) {
                        void 0 !== t[e] && console.warn("gridstack.js: Option `" + e + "` is deprecated in " + i + s)
                    }, e.obsoleteAttr = function (t, e, i, s) {
                        let r = t.getAttribute(e);
                        null !== r && (t.setAttribute(i, r), console.warn("gridstack.js: attribute `" + e + "`=" + r + " is deprecated on this object in " + s + " and has been replaced with `" + i + "`. It will be **completely** removed in v1.0"))
                    }, e.Utils = class {
                        static getElements(t) {
                            if ("string" == typeof t) {
                                let e = document.querySelectorAll(t);
                                return e.length || "." === t[0] || "#" === t[0] || (e = document.querySelectorAll("." + t), e.length || (e = document.querySelectorAll("#" + t))), Array.from(e)
                            }
                            return [t]
                        }
                        static getElement(t) {
                            if ("string" == typeof t) {
                                if (!t.length) return null;
                                if ("#" === t[0]) return document.getElementById(t.substring(1));
                                if ("." === t[0] || "[" === t[0]) return document.querySelector(t);
                                if (!isNaN(+t[0])) return document.getElementById(t);
                                let e = document.querySelector(t);
                                return e || (e = document.getElementById(t)), e || (e = document.querySelector("." + t)), e
                            }
                            return t
                        }
                        static isIntercepted(t, e) {
                            return !(t.x + t.w <= e.x || e.x + e.w <= t.x || t.y + t.h <= e.y || e.y + e.h <= t.y)
                        }
                        static sort(t, e, i) {
                            if (!i) {
                                let e = t.map((t => t.x + t.w));
                                i = Math.max(...e)
                            }
                            return -1 === e ? t.sort(((t, e) => e.x + e.y * i - (t.x + t.y * i))) : t.sort(((t, e) => t.x + t.y * i - (e.x + e.y * i)))
                        }
                        static createStylesheet(t, e) {
                            let i = document.createElement("style");
                            return i.setAttribute("type", "text/css"), i.setAttribute("gs-style-id", t), i.styleSheet ? i.styleSheet.cssText = "" : i.appendChild(document.createTextNode("")), e ? e.insertBefore(i, e.firstChild) : (e = document.getElementsByTagName("head")[0]).appendChild(i), i.sheet
                        }
                        static removeStylesheet(t) {
                            let e = document.querySelector("STYLE[gs-style-id=" + t + "]");
                            e && e.parentNode && e.remove()
                        }
                        static addCSSRule(t, e, i) {
                            "function" == typeof t.addRule ? t.addRule(e, i) : "function" == typeof t.insertRule && t.insertRule(`${e}{${i}}`)
                        }
                        static toBool(t) {
                            return "boolean" == typeof t ? t : "string" == typeof t ? !("" === (t = t.toLowerCase()) || "no" === t || "false" === t || "0" === t) : Boolean(t)
                        }
                        static toNumber(t) {
                            return null === t || 0 === t.length ? void 0 : Number(t)
                        }
                        static parseHeight(t) {
                            let e, i = "px";
                            if ("string" == typeof t) {
                                let s = t.match(/^(-[0-9]+\.[0-9]+|[0-9]*\.[0-9]+|-[0-9]+|[0-9]+)(px|em|rem|vh|vw|%)?$/);
                                if (!s) throw new Error("Invalid height");
                                i = s[2] || "px", e = parseFloat(s[1])
                            } else e = t;
                            return {
                                h: e,
                                unit: i
                            }
                        }
                        static defaults(t, ...e) {
                            return e.forEach((e => {
                                for (const i in e) {
                                    if (!e.hasOwnProperty(i)) return;
                                    null === t[i] || void 0 === t[i] ? t[i] = e[i] : "object" == typeof e[i] && "object" == typeof t[i] && this.defaults(t[i], e[i])
                                }
                            })), t
                        }
                        static same(t, e) {
                            if ("object" != typeof t) return t == e;
                            if (typeof t != typeof e) return !1;
                            if (Object.keys(t).length !== Object.keys(e).length) return !1;
                            for (const i in t)
                                if (t[i] !== e[i]) return !1;
                            return !0
                        }
                        static removeInternalAndSame(t, e) {
                            if ("object" == typeof t && "object" == typeof e)
                                for (let i in t) {
                                    let s = t[i];
                                    if (s && "object" == typeof s) {
                                        for (let t in s) s[t] !== e[i][t] && "_" !== t[0] || delete s[t];
                                        Object.keys(s).length || delete t[i]
                                    } else s !== e[i] && "_" !== i[0] || delete t[i]
                                }
                        }
                        static closestByClass(t, e) {
                            for (; t = t.parentElement;)
                                if (t.classList.contains(e)) return t;
                            return null
                        }
                        static throttle(t, e) {
                            let i = !1;
                            return (...s) => {
                                i || (i = !0, setTimeout((() => {
                                    t(...s), i = !1
                                }), e))
                            }
                        }
                        static removePositioningStyles(t) {
                            let e = t.style;
                            e.position && e.removeProperty("position"), e.left && e.removeProperty("left"), e.top && e.removeProperty("top"), e.width && e.removeProperty("width"), e.height && e.removeProperty("height")
                        }
                        static getScrollParent(t) {
                            if (null === t) return document.documentElement;
                            const e = getComputedStyle(t);
                            return /(auto|scroll)/.test(e.overflow + e.overflowY) ? t : this.getScrollParent(t.parentElement)
                        }
                        static updateScrollPosition(t, e, i) {
                            let s = t.getBoundingClientRect(),
                                r = window.innerHeight || document.documentElement.clientHeight;
                            if (s.top < 0 || s.bottom > r) {
                                let o = s.bottom - r,
                                    n = s.top,
                                    l = this.getScrollParent(t);
                                if (null !== l) {
                                    let a = l.scrollTop;
                                    s.top < 0 && i < 0 ? t.offsetHeight > r ? l.scrollTop += i : l.scrollTop += Math.abs(n) > Math.abs(i) ? i : n : i > 0 && (t.offsetHeight > r ? l.scrollTop += i : l.scrollTop += o > i ? i : o), e.top += l.scrollTop - a
                                }
                            }
                        }
                        static updateScrollResize(t, e, i) {
                            const s = this.getScrollParent(e),
                                r = s.clientHeight,
                                o = t.clientY < i,
                                n = t.clientY > r - i;
                            o ? s.scrollBy({
                                behavior: "smooth",
                                top: t.clientY - i
                            }) : n && s.scrollBy({
                                behavior: "smooth",
                                top: i - (r - t.clientY)
                            })
                        }
                    }
                }
            },
            e = {};
        return function i(s) {
            if (e[s]) return e[s].exports;
            var r = e[s] = {
                exports: {}
            };
            return t[s](r, r.exports, i), r.exports
        }(117)
    })().GridStack
}));
//# sourceMappingURL=gridstack-h5.js.map