---
title: Passing arguments through parameter objects
author: 'wouter'
pubDate: "2006-09-12T00:10:00.000Z"
heroImage: ./preview.jpg
hasCover: true
description: ""

comments: true
permalink: /2006/09/12/passing-arguments-through-parameter-objects/
tags:
  - Actionscript 2.0
---
Goodevening everyone!

In this first post, I’ll talk about the use of parameter objects to pass arguments to a function. Imagine you have written a kick-ass function to create a button movieclip. You want to use it in multiple applications, so it should be easy to change the colors, borders, labels etc… You might pass all this information as arguments in the function call, but the more parameters you want to set, the more arguments your function will get and… the messier your code will look.

<!--more--> So you have the following class:

```actionscript-3
class MyButton extends MovieClip {
    private var background_mc:MovieClip;
    private var label_txt:TextField;
    public function onLoad(success:Boolean){
    }
    public function create(label:String, bgcolor:Number) {
        //create the text field
        this.createTextField("label_txt", 1, , , 20, 20);
        this.label_txt.autoSize = "left";
        this.label_txt.text = label;
        //create the background
        this.createEmptyMovieClip("background_mc", );
        var w:Number = this.label_txt._width;
        var h:Number = this.label_txt._height;
        with (this.background_mc) {
            beginFill(bgcolor, 100);
            moveTo(, );
            lineTo(w, );
            lineTo(w, h);
            lineTo(, h);
            lineTo(, );
            endFill();
        }
    }
}
```

Ok, this is still pretty simple. Now we want to be able to set the border color, border width, and text color through the function. You could add this in the function arguments, and change the calls to the function accordingly…

```actionscript-3
public function create(label:String, bgcolor:Number, bordercolor:Number, borderwidth:Number, textcolor:Number)
```

You might already see where I’m taking this. The more arguments you want to pass to this function, the more difficult it is to keep track of the different options you have, and the more difficult your code will be to read. This is where the magic of parameter objects comes in…

Instead of passing all these arguments seperately, we pass one object, containing parameter values:

```actionscript-3
public function create(param_obj:Object) {
    var label:String = (param_obj.label) ? param_obj.label : "";
    var bgcolor:Number = (param_obj.bgcolor) ? param_obj.bgcolor : 0xFFFFFF;
    var bordercolor:Number = (param_obj.bordercolor) ? param_obj.bordercolor : 0x000000;
    var borderwidth:Number = (param_obj.borderwidth) ? param_obj.borderwidth : 1;
    var textcolor:Number = (param_obj.textcolor) ? param_obj.textcolor : 0x000000;
    //create the text field
    this.createTextField("label_txt", 1, , , 20, 20);
    var label_fmt:TextFormat = new TextFormat();
    label_fmt.color = textcolor;
    this.label_txt.setNewTextFormat(label_fmt);
    this.label_txt.autoSize = "left";
    this.label_txt.text = label;
    //create the background
    this.createEmptyMovieClip("background_mc", );
    var w:Number = this.label_txt._width;
    var h:Number = this.label_txt._height;
    with (this.background_mc) {
        if (borderwidth>) {
            lineStyle(borderwidth, bordercolor);
        }
        beginFill(bgcolor, 100);
        moveTo(, );
        lineTo(w, );
        lineTo(w, h);
        lineTo(, h);
        lineTo(, );
        endFill();
    }
}
```

and the call to the function looks like this:

```actionscript-3
buttoninstance.create({label: "cool button", bgcolor: 0x003366, textcolor: 0xFFFFFF});
```

This method of passing arguments to your function makes your functions easier to extends (parameters) and your actionscript code much more readable. A lot of built-in actionscript functions, like attachMovie support parameter objects, to pass extra arguments, like \_x or \_y position of a movieclip. Again, you could define your own class properties and pass them via this parameter object to the class.

We could change our button class to look like this:

```actionscript-3
class MyButton extends MovieClip {
    //stage instances
    private var background_mc:MovieClip;
    private var label_txt:TextField;
    //end stage instances
    private var __label:String = "";
    private var __bgcolor:Number = 0xFFFFFF;
    private var __bordercolor:Number = 0x000000;
    private var __borderwidth:Number = 1;
    private var __textcolor:Number = 0x000000;
    //get and set the label
    public function get label():String {
        return this.__label;
    }
    public function set label(value:String) {
        this.__label = value;
        if (this.label_txt) {
            this.label_txt.text = this.label;
        }
    }
    //change the background color
    public function get bgcolor():Number {
        return this.__bgcolor;
    }
    public function set bgcolor(value:Number) {
        this.__bgcolor = value;
        if (this.background_mc) {
            this.drawBackground();
        }
    }
    //change the border color
    public function get bordercolor():Number {
        return this.__bordercolor;
    }
    public function set bordercolor(value:Number) {
        this.__bordercolor = value;
        if (this.background_mc) {
            this.drawBackground();
        }
    }
    //change the border width
    public function get borderwidth():Number {
        return this.__borderwidth;
    }
    public function set borderwidth(value:Number) {
        this.__borderwidth = value;
        if (this.background_mc) {
            this.drawBackground();
        }
    }
    //change the text color
    public function get textcolor():Number {
        return this.__textcolor;
    }
    public function set textcolor(value:Number) {
        this.__textcolor = value;
        if (this.label_txt) {
            this.formatTextField();
        }
    }
    public function onLoad(success:Boolean) {
        //create the text field
        this.createTextField("label_txt", 1, , , 20, 20);
        this.label_txt.autoSize = "left";
        this.formatTextField();
        this.drawBackground();
    }
    private function formatTextField():Void {
        var label_fmt:TextFormat = new TextFormat();
        label_fmt.color = this.textcolor;
        this.label_txt.setNewTextFormat(label_fmt);
        this.label_txt.text = this.label;
    }
    private function drawBackground():Void {
        //create the background
        this.createEmptyMovieClip("background_mc", );
        var w:Number = this.label_txt._width;
        var h:Number = this.label_txt._height;
        with (this.background_mc) {
            if (this.borderwidth>) {
                lineStyle(this.borderwidth, this.bordercolor);
            }
            beginFill(this.bgcolor, 100);
            moveTo(, );
            lineTo(w, );
            lineTo(w, h);
            lineTo(, h);
            lineTo(, );
            endFill();
        }
    }
}
```

And we would create this kick ass button in one call:

```actionscript-3
this.attachMovie("MyButton", "button_mc", , {label: "my kick ass button", bgcolor: 0x003366, textcolor: 0xFFFFFF});
```

That’s it! I have included [the sample code in a ZIP file][1]…

[1]: /wp-content/uploads/2006/09/passing_arguments_through_parameter_objects.zip