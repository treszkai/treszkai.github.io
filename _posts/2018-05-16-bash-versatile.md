---
layout: post
title:  "Some versatile tools for bash"
categories: bash
---

I rarely use bash besides the basics: I could use a `for` loop even if woken up at night, but my knowledge of the language doesn't go much further. Hence instead of trying to memorize all the `{}%$` magic, having a few versatile commands in my toolbox comes handy.

Recently I faced the task of renaming a set of files {`foo 02.jpg`, ..., `foo 74.jpg`} to {`foo 06.jpg`, ..., `foo 78.jpg`}. My approach contained nothing extraordinary:
```bash
#!/bin/bash

for i in `seq 74 2`
do
    printf -v oldname "foo %02d.jpg" $i
    printf -v newname "foo %02d.jpg" $(echo "$i+4" | bc)

    mv "$oldname" "$newname"
done
```

Yet there were some educational points in it:
 - Renaming a set of files to a similar name but later in the alphabet must be done in reverse order.
 - Bash has a built-in `printf` that seems to work as in C: first the string to be printed, then the values to the
 - With the `-v` option of `printf`, you can save the output into a variable.
 - One can use `$(  )` for executing a command and having bash treat the output as the source code. (It's the same as using backticks, as around `seq 74 2`, but allows nesting and is clearer. Kinda like `eval` in other languages, like JavaScript.) Not shown here, but it even works in quotation marks, e.g. `"$(echo hey yo)"` is like writing `"hey yo"`. Note that the trailing newline is deleted.
 - `bc` is a calculator that reads from the input and outputs nothing but the result on a single line.
 - Don’t forget the quotes around arguments with spaces, like with `mv` above.
