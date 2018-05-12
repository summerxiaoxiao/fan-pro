import Vue from 'vue'
import _ from 'underscore'

import { createEmptyDirectory, generateId } from '../../api/data'
import { searchTree } from '../../api/common'
import {
  createDirectory, deleteItem, fetchDirectoryParents, fetchDirectoryTree, fetchList, moveItem,
  renameItem
} from '../../api/dataset'

export default {
  namespaced: true,
  state: {
    directoryStack: [{
      id: null,
      name: '数据集'
    }],
    tree: [],
    items: [],
    datasetList: []
  },

  getters: {
    currentParentDirectory (state) {
      return state.directoryStack.length ? state.directoryStack[state.directoryStack.length - 1] : null
    },
    directoryAppendingId (state) {
      const directory = _.find(state.items, item => {
        return item.appending === true && item.type === '0'
      })
      return directory ? directory.id : null
    }
  },

  mutations: {
    setItems (state, items) {
      state.items = items
    },
    createDirectory (state) {
      const currentParentDirectory = this.getters['datasetManage/currentParentDirectory']
      const emptyDirectory = createEmptyDirectory({name: '新建文件夹', parentId: currentParentDirectory ? currentParentDirectory.id : null})
      state.items.unshift(emptyDirectory)
    },
    removeDirectory (state, id) {
      const index = _.findIndex(state.items, item => {
        return item.id === id && item.type === '0'
      })

      if (index > -1) {
        state.items.splice(index, 1)
      }
    },
    replaceItem (state, {newItem, oldId}) {
      const index = _.findIndex(state.items, item => {
        return item.id === oldId
      })
      let item
      if (index > -1 && (item = state.items[index])) {
        item = Object.assign({}, item, newItem)
        delete item['appending']
        state.items.splice(index, 1, item)
      }
    },
    moveItem (state, {id, parentId}) {
      const index = _.findIndex(state.items, item => {
        return item.id === id
      })
      if (index > -1) {
        const item = state.items[index]
        item.parentId = parentId === 'root' ? null : parentId
        state.items.splice(index, 1, Object.assign({}, item))
      }
    },
    renameItem (state, {id, name}) {
      const index = _.findIndex(state.items, item => {
        return item.id === id
      })
      if (index > -1) {
        const item = state.items[index]
        item.name = name
        state.items.splice(index, 1, Object.assign({}, item))
      }
    },
    deleteItem (state, {id}) {
      const index = _.findIndex(state.items, item => {
        return item.id === id
      })
      if (index > -1) {
        state.items.splice(index, 1)
      }
    },
    setDirectoryStack (state, stack) {
      state.directoryStack = stack
    },
    setTree (state, tree) {
      state.tree = tree
    },
    addTreeNode (state, parentId) {
      const node = searchTree(state.tree, parentId || 'root')
      if (node) {
        Vue.set(node, 'children', node.children || [])
        node.children.push({id: generateId(), name: '新建文件夹', appending: true, parentId: parentId})
      }
    },
    removeTreeNode (state, {parentId, id}) {
      const parentNode = searchTree(state.tree, parentId)
      if (parentNode && parentNode.children) {
        const index = _.findIndex(parentNode.children, node => {
          return node.id === id
        })
        if (index > -1) {
          parentNode.children.splice(index, 1)
        }
      }
    },
    replaceTreeNode (state, {oldId, newNode}) {
      const parentNode = searchTree(state.tree, newNode.parentId ? newNode.parentId : 'root')
      if (parentNode && parentNode.children) {
        const index = _.findIndex(parentNode.children, node => {
          return node.id === oldId
        })
        let node
        if (index > -1 && (node = parentNode.children[index])) {
          node = Object.assign({}, node, newNode)
          delete node['appending']
          parentNode.children.splice(index, 1, node)
        }
      }
    },
    setDatasetList (state, items) {
      state.datasetList = items
    }
  },
  actions: {
    fetchList ({commit}, {parentId, keyword, sortType}) {
      return fetchList({parentId, keyword, sortType}).then(items => {
        commit('setItems', items)
      })
    },
    fetchDirectoryTree ({commit}) {
      return fetchDirectoryTree().then(tree => {
        commit('setTree', tree)
      })
    },
    deleteItem ({commit}, {id, type}) {
      return deleteItem({id, type}).then(() => {
        commit('deleteItem', {id, type})
      })
    },
    renameItem ({commit}, {id, type, name}) {
      return renameItem({id, type, name}).then(() => {
        commit('renameItem', {id, type, name})
      })
    },
    moveItem ({commit}, {id, type, parentId}) {
      return moveItem({id, type, parentId}).then(() => {
        commit('moveItem', {id, type, parentId})
      })
    },
    createDirectory ({commit, state}, {id, name, parentId}) {
      return createDirectory({name, parentId}).then(item => {
        commit('replaceTreeNode', {oldId: id, newNode: item})
        commit('replaceItem', {oldId: id, newItem: item})
        return item
      })
    },
    fetchDirectoryStack ({commit}, {id}) {
      if (!id) {
        return Promise.resolve().then(() => {
          commit('setDirectoryStack', [{
            id: null,
            name: '数据集'
          }])
        })
      } else {
        return fetchDirectoryParents(id).then((parents) => {
          if (!_.isEmpty(parents)) {
            commit('setDirectoryStack', parents)
          } else {
            return Promise.reject('该目录信息未找到')
          }
        }).catch((e) => {
          commit('setDirectoryStack', [{
            id: null,
            name: '数据集'
          }])
          return Promise.reject(e)
        })
      }
    }
  }
}

