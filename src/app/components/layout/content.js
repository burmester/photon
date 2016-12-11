import React from 'react';

export default class Content extends React.Component {
  render () {
    let html = this.props.users.map(user => (<div key={user.name}>{user.name}</div>));
    return (
      <main>
        {html}
        <article>
          <h1>heading1</h1>
          <p>
            Organic deep v kombucha master cleanse polaroid listicle. Trust fund mixtape iPhone YOLO viral, biodiesel coloring book dreamcatcher twee prism cardigan gastropub man bun unicorn. Heirloom intelligentsia tote bag, irony gluten-free PBR&B cold-pressed slow-carb. Thundercats trust fund kitsch ethical succulents, edison bulb sartorial put a bird on it snackwave shoreditch. Hella tilde fashion axe, leggings PBR&B hexagon kombucha etsy. Fixie knausgaard PBR&B, man bun quinoa fanny pack kale chips. Gochujang forage pork belly microdosing, squid four loko 8-bit vaporware church-key wolf narwhal stumptown cornhole helvetica.
          </p>
        </article>
        <article>
          <h1>heading1</h1>
          <p>
            Organic deep v kombucha master cleanse polaroid listicle. Trust fund mixtape iPhone YOLO viral, biodiesel coloring book dreamcatcher twee prism cardigan gastropub man bun unicorn. Heirloom intelligentsia tote bag, irony gluten-free PBR&B cold-pressed slow-carb. Thundercats trust fund kitsch ethical succulents, edison bulb sartorial put a bird on it snackwave shoreditch. Hella tilde fashion axe, leggings PBR&B hexagon kombucha etsy. Fixie knausgaard PBR&B, man bun quinoa fanny pack kale chips. Gochujang forage pork belly microdosing, squid four loko 8-bit vaporware church-key wolf narwhal stumptown cornhole helvetica.
          </p>
        </article>
        <article>
          <h1>heading1</h1>
          <p>
            Organic deep v kombucha master cleanse polaroid listicle. Trust fund mixtape iPhone YOLO viral, biodiesel coloring book dreamcatcher twee prism cardigan gastropub man bun unicorn. Heirloom intelligentsia tote bag, irony gluten-free PBR&B cold-pressed slow-carb. Thundercats trust fund kitsch ethical succulents, edison bulb sartorial put a bird on it snackwave shoreditch. Hella tilde fashion axe, leggings PBR&B hexagon kombucha etsy. Fixie knausgaard PBR&B, man bun quinoa fanny pack kale chips. Gochujang forage pork belly microdosing, squid four loko 8-bit vaporware church-key wolf narwhal stumptown cornhole helvetica.
          </p>
        </article>
        <article>
          <h1>heading1</h1>
          <p>
            Organic deep v kombucha master cleanse polaroid listicle. Trust fund mixtape iPhone YOLO viral, biodiesel coloring book dreamcatcher twee prism cardigan gastropub man bun unicorn. Heirloom intelligentsia tote bag, irony gluten-free PBR&B cold-pressed slow-carb. Thundercats trust fund kitsch ethical succulents, edison bulb sartorial put a bird on it snackwave shoreditch. Hella tilde fashion axe, leggings PBR&B hexagon kombucha etsy. Fixie knausgaard PBR&B, man bun quinoa fanny pack kale chips. Gochujang forage pork belly microdosing, squid four loko 8-bit vaporware church-key wolf narwhal stumptown cornhole helvetica.
          </p>
        </article>
        <article>
          <h1>heading1</h1>
          <p>
            Organic deep v kombucha master cleanse polaroid listicle. Trust fund mixtape iPhone YOLO viral, biodiesel coloring book dreamcatcher twee prism cardigan gastropub man bun unicorn. Heirloom intelligentsia tote bag, irony gluten-free PBR&B cold-pressed slow-carb. Thundercats trust fund kitsch ethical succulents, edison bulb sartorial put a bird on it snackwave shoreditch. Hella tilde fashion axe, leggings PBR&B hexagon kombucha etsy. Fixie knausgaard PBR&B, man bun quinoa fanny pack kale chips. Gochujang forage pork belly microdosing, squid four loko 8-bit vaporware church-key wolf narwhal stumptown cornhole helvetica.
          </p>
        </article>
        <article>
          <h1>heading1</h1>
          <p>
            Organic deep v kombucha master cleanse polaroid listicle. Trust fund mixtape iPhone YOLO viral, biodiesel coloring book dreamcatcher twee prism cardigan gastropub man bun unicorn. Heirloom intelligentsia tote bag, irony gluten-free PBR&B cold-pressed slow-carb. Thundercats trust fund kitsch ethical succulents, edison bulb sartorial put a bird on it snackwave shoreditch. Hella tilde fashion axe, leggings PBR&B hexagon kombucha etsy. Fixie knausgaard PBR&B, man bun quinoa fanny pack kale chips. Gochujang forage pork belly microdosing, squid four loko 8-bit vaporware church-key wolf narwhal stumptown cornhole helvetica.
          </p>
        </article>
        <article>
          <h1>heading1</h1>
          <p>
            Organic deep v kombucha master cleanse polaroid listicle. Trust fund mixtape iPhone YOLO viral, biodiesel coloring book dreamcatcher twee prism cardigan gastropub man bun unicorn. Heirloom intelligentsia tote bag, irony gluten-free PBR&B cold-pressed slow-carb. Thundercats trust fund kitsch ethical succulents, edison bulb sartorial put a bird on it snackwave shoreditch. Hella tilde fashion axe, leggings PBR&B hexagon kombucha etsy. Fixie knausgaard PBR&B, man bun quinoa fanny pack kale chips. Gochujang forage pork belly microdosing, squid four loko 8-bit vaporware church-key wolf narwhal stumptown cornhole helvetica.
          </p>
        </article>
      </main>
    );
  }
}

Content.propTypes = {
  users: React.PropTypes.array
};
