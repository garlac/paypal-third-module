// Module 1 output is string - feed
// Module 2 output is array of objects - postArray

class Feed {
    constructor(post,postArray) {
        this.post = post;
        this.postArray = postArray;
    }

    convertFeed() {
        //empty array to store words of formatted post
        var newArray = [];

        //sorting the postArray
        this.postArray.sort(( a, b ) => {
            if ( a.start_index < b.start_index ){
                return -1;
            }
            if ( a.start_index > b.start_index ){
                return 1;
            }
            return 0;
        });
        
        //add all words before first concept
        if(this.postArray[0].start_index != 0) {
            newArray.push(this.post.slice(0,this.postArray[0].start_index)) 
        }

        let self = this;
        for(let i=0; i<this.postArray.length; i++) {
            if(this.postArray[i+1] != undefined) {
                let word = this.post.slice(this.postArray[i].start_index,this.postArray[i].end_index)
                let concept = new Concept(this.postArray[i],word)
                newArray.push(concept.wrap())
                updateNewArray(this.postArray[i].end_index,this.postArray[i+1].start_index)
            } else {
                let word = this.post.slice(this.postArray[i].start_index,this.postArray[i].end_index)
                let concept = new Concept(this.postArray[i],word)
                newArray.push(concept.wrap())
                newArray.push(this.post.slice(this.postArray[i].end_index))
            }
        }

        // add other words inbetween the concepts
        function updateNewArray(end_index,start_index) {
            newArray.push(self.post.slice(end_index,start_index))
        }

        //finally,join the new words back into post
        return newArray.join("")
    }
}

class Concept {
    constructor(obj,word) {
        this.obj = obj;
        this.word = word;
    }
    wrap() {
        if(this.obj.type === "entity") {
            return '<strong>'+ this.word +'</strong>'
        } else if(this.obj.type === "twitter_username") {
            this.word = this.word.split("@")[1]
            return '@<a href="http://twitter.com/'+ this.word +'\"'+'>'+ this.word +'</a>'
        } else if(this.obj.type === "facebook_username") {
            this.word = this.word.split("@")[1]
            return '@<a href="http://facebook.com/'+ this.word +'\"'+'>'+ this.word +'</a>'
        } else if(this.obj.type === "link") {
            return '<a href=\"'+this.word+'\"'+'>'+this.word+'</a>'
        }
    }
}

module.exports = {
    Feed,
    Concept
}